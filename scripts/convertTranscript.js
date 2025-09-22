const fs = require('fs');
const path = require('path');

function parseTranscriptText(text, episodeId) {
  const lines = text.split('\n');
  const segments = [];

  let currentSpeaker = '';
  let currentTimestamp = '';
  let currentText = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Match speaker and timestamp pattern: "Speaker Name (00:00.000)"
    const speakerMatch = trimmed.match(/^(.+?)\s*\((\d{1,2}:\d{2}\.\d{3})\)$/);

    if (speakerMatch) {
      // Save previous segment if exists
      if (currentSpeaker && currentText) {
        segments.push({
          speaker: currentSpeaker,
          timestamp: formatTimestamp(currentTimestamp),
          text: currentText.trim()
        });
      }

      // Start new segment
      currentSpeaker = speakerMatch[1];
      currentTimestamp = speakerMatch[2];
      currentText = '';
    } else {
      // Continuation of current speaker's text
      currentText += (currentText ? ' ' : '') + trimmed;
    }
  }

  // Add last segment
  if (currentSpeaker && currentText) {
    segments.push({
      speaker: currentSpeaker,
      timestamp: formatTimestamp(currentTimestamp),
      text: currentText.trim()
    });
  }

  return {
    episodeId,
    segments
  };
}

function formatTimestamp(timestamp) {
  // Convert MM:SS.mmm to HH:MM:SS format
  const [minSec] = timestamp.split('.');
  const parts = minSec.split(':');

  if (parts.length === 2) {
    const [min, sec] = parts;
    return `00:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
  } else if (parts.length === 3) {
    return timestamp; // Already in HH:MM:SS format
  }

  return timestamp;
}

// Get episode number from command line argument or process all available
const episodeArg = process.argv[2];

if (episodeArg) {
  // Process single episode
  const episodeNum = parseInt(episodeArg);
  const transcriptPath = path.join(process.env.HOME, 'Downloads', `momitfm${episodeNum}.txt`);
  const outputPath = path.join(process.cwd(), 'public', 'transcripts', `${episodeNum}.json`);

  try {
    const text = fs.readFileSync(transcriptPath, 'utf-8');
    const transcript = parseTranscriptText(text, episodeNum);

    fs.writeFileSync(outputPath, JSON.stringify(transcript, null, 2), 'utf-8');
    console.log(`✅ Episode ${episodeNum} transcript converted successfully!`);
    console.log(`   Input: ${transcriptPath}`);
    console.log(`   Output: ${outputPath}`);
    console.log(`   Total segments: ${transcript.segments.length}`);
  } catch (error) {
    console.error(`Error converting episode ${episodeNum}:`, error.message);
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
    }
  });
}