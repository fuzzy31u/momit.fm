const fs = require('fs');
const path = require('path');
const { parseTranscriptText } = require('./transcriptUtils');

function parseCliArgs(argv) {
  const args = {
    episodeNum: null,
    inputPath: null,
    outputPath: null
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--input') {
      args.inputPath = argv[i + 1];
      i += 1;
    } else if (arg === '--output') {
      args.outputPath = argv[i + 1];
      i += 1;
    } else if (!args.episodeNum) {
      args.episodeNum = parseInt(arg, 10);
    }
  }

  return args;
}

const { episodeNum, inputPath, outputPath } = parseCliArgs(process.argv);

if (episodeNum) {
  // Process single episode
  const transcriptPath = inputPath || path.join(process.env.HOME, 'Downloads', `momitfm${episodeNum}.txt`);
  const resolvedOutputPath = outputPath || path.join(process.cwd(), 'public', 'transcripts', `${episodeNum}.json`);

  try {
    const text = fs.readFileSync(transcriptPath, 'utf-8');
    const transcript = parseTranscriptText(text, episodeNum);

    fs.writeFileSync(resolvedOutputPath, JSON.stringify(transcript, null, 2), 'utf-8');
    console.log(`✅ Episode ${episodeNum} transcript converted successfully!`);
    console.log(`   Input: ${transcriptPath}`);
    console.log(`   Output: ${resolvedOutputPath}`);
    console.log(`   Total segments: ${transcript.segments.length}`);
  } catch (error) {
    console.error(`Error converting episode ${episodeNum}:`, error.message);
    process.exitCode = 1;
  }
} else {
  // Process all available episodes
  const episodes = [82, 83, 86];

  episodes.forEach(episodeNum => {
    const transcriptPath = path.join(process.env.HOME, 'Downloads', `momitfm${episodeNum}.txt`);
    const outputPath = path.join(process.cwd(), 'public', 'transcripts', `${episodeNum}.json`);

    try {
      if (fs.existsSync(transcriptPath)) {
        const text = fs.readFileSync(transcriptPath, 'utf-8');
        const transcript = parseTranscriptText(text, episodeNum);

        fs.writeFileSync(outputPath, JSON.stringify(transcript, null, 2), 'utf-8');
        console.log(`✅ Episode ${episodeNum} transcript converted successfully!`);
        console.log(`   Segments: ${transcript.segments.length}`);
      }
    } catch (error) {
      console.error(`Error converting episode ${episodeNum}:`, error.message);
      process.exitCode = 1;
    }
  });
}
