const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');
const xml2js = require('xml2js');

const RSS_URL = 'https://rss.art19.com/momitfm';
const DOWNLOADS_DIR = path.join(process.env.HOME, 'Downloads');
const EXTENSIONS = ['.txt', '.srt', '.mp3'];
const RECENCY_DAYS = 7;

function parseArgs(argv) {
  const args = {
    episodeNum: null,
    autoApprove: false,
    json: false
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--yes') {
      args.autoApprove = true;
    } else if (arg === '--json') {
      args.json = true;
    } else if (!args.episodeNum) {
      args.episodeNum = parseInt(arg, 10);
    }
  }

  return args;
}

function fetchNextEpisodeNumber() {
  return new Promise((resolve, reject) => {
    https.get(RSS_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
          if (err) return reject(err);
          const items = result.rss.channel[0].item;
          resolve(items.length + 1);
        });
      });
    }).on('error', reject);
  });
}

function findCandidateFiles() {
  const cutoff = Date.now() - RECENCY_DAYS * 24 * 60 * 60 * 1000;
  const allFiles = fs.readdirSync(DOWNLOADS_DIR);
  const candidates = new Map();

  for (const ext of EXTENSIONS) {
    const matching = allFiles
      .filter((f) => {
        if (!f.endsWith(ext)) return false;
        if (f.startsWith('momitfm')) return false;
        const stat = fs.statSync(path.join(DOWNLOADS_DIR, f));
        return stat.isFile() && stat.mtimeMs >= cutoff;
      })
      .map((f) => {
        const stat = fs.statSync(path.join(DOWNLOADS_DIR, f));
        return { name: f, mtime: stat.mtimeMs };
      })
      .sort((a, b) => b.mtime - a.mtime);

    if (matching.length > 0) {
      candidates.set(ext, matching[0].name);
    }
  }

  return candidates;
}

function askConfirmation(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

async function main() {
  // 1. Determine episode number
  let episodeNum;
  const args = parseArgs(process.argv);
  if (args.episodeNum) {
    episodeNum = args.episodeNum;
    if (isNaN(episodeNum)) {
      console.error('エピソード番号が不正です:', process.argv[2]);
      process.exit(1);
    }
  } else {
    try {
      episodeNum = await fetchNextEpisodeNumber();
      console.log(`RSS から次のエピソード番号を取得: ${episodeNum}`);
    } catch (err) {
      console.error('RSS フィードの取得に失敗しました:', err.message);
      console.error('手動でエピソード番号を指定してください: node scripts/renameDownloads.js <episode-number>');
      process.exit(1);
    }
  }

  // 2. Find candidate files
  const candidates = findCandidateFiles();
  if (candidates.size === 0) {
    console.log(`~/Downloads に過去 ${RECENCY_DAYS} 日以内の対象ファイル (.txt, .srt, .mp3) が見つかりませんでした。`);
    process.exit(0);
  }

  // 3. Build rename plan and check for conflicts
  const renames = [];
  for (const [ext, fileName] of candidates) {
    const target = `momitfm${episodeNum}${ext}`;
    const targetPath = path.join(DOWNLOADS_DIR, target);
    if (fs.existsSync(targetPath)) {
      console.log(`⚠️  スキップ: ${target} は既に存在します`);
      continue;
    }
    renames.push({
      from: path.join(DOWNLOADS_DIR, fileName),
      to: targetPath,
      fromName: fileName,
      toName: target,
    });
  }

  if (renames.length === 0) {
    console.log('リネーム対象のファイルがありません。');
    process.exit(0);
  }

  if (args.json) {
    console.log(JSON.stringify({
      episodeNum,
      renames
    }, null, 2));
    if (!args.autoApprove) {
      process.exit(0);
    }
  }

  // 4. Show plan and confirm
  console.log(`\nEpisode ${episodeNum} のファイルをリネームします:\n`);
  const maxFromLen = Math.max(...renames.map((r) => r.fromName.length));
  for (const r of renames) {
    console.log(`  ${r.fromName.padEnd(maxFromLen)}  ->  ${r.toName}`);
  }
  console.log();

  const confirmed = args.autoApprove ? true : await askConfirmation('実行しますか？ (y/n): ');
  if (!confirmed) {
    console.log('キャンセルしました。');
    process.exit(0);
  }

  // 5. Execute renames
  for (const r of renames) {
    fs.renameSync(r.from, r.to);
    console.log(`✅ ${r.fromName} -> ${r.toName}`);
  }

  console.log(`\n次のステップ: node scripts/convertTranscript.js ${episodeNum}`);
}

main().catch(console.error);
