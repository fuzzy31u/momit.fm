const fs = require('fs');
const path = require('path');

const TIMESTAMP_RE = /^\d{2}:\d{2}:\d{2}$/;

function validateTranscript(filePath) {
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const problems = [];

  if (!Number.isInteger(payload.episodeId)) {
    problems.push('episodeId must be an integer');
  }

  if (!Array.isArray(payload.segments) || payload.segments.length === 0) {
    problems.push('segments must be a non-empty array');
  } else {
    payload.segments.forEach((segment, index) => {
      if (typeof segment.speaker !== 'string' || !segment.speaker.trim()) {
        problems.push(`segments[${index}].speaker must be a non-empty string`);
      }
      if (typeof segment.timestamp !== 'string' || !TIMESTAMP_RE.test(segment.timestamp)) {
        problems.push(`segments[${index}].timestamp must match HH:MM:SS`);
      }
      if (typeof segment.text !== 'string' || !segment.text.trim()) {
        problems.push(`segments[${index}].text must be a non-empty string`);
      }
    });
  }

  return problems;
}

function main() {
  const targets = process.argv.slice(2);
  const files = targets.length > 0
    ? targets
    : fs.readdirSync(path.join(process.cwd(), 'public', 'transcripts'))
      .filter((file) => file.endsWith('.json'))
      .map((file) => path.join(process.cwd(), 'public', 'transcripts', file));

  const failures = [];

  files.forEach((filePath) => {
    const problems = validateTranscript(filePath);
    if (problems.length === 0) {
      console.log(`✅ ${filePath}`);
      return;
    }

    failures.push({ filePath, problems });
    console.error(`❌ ${filePath}`);
    problems.forEach((problem) => console.error(`   - ${problem}`));
  });

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main();
