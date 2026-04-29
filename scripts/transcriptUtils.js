const SPEAKER_LINE_RE = /^(.+?)\s*\((\d{1,2}:\d{2}\.\d{2,3})\)$/;

function formatTimestamp(timestamp) {
  const [minSec] = timestamp.split('.');
  const parts = minSec.split(':');

  if (parts.length === 2) {
    const [min, sec] = parts;
    return `00:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
  } else if (parts.length === 3) {
    return parts.map((part) => part.padStart(2, '0')).join(':');
  }

  return timestamp;
}

function parseTranscriptText(text, episodeId) {
  const lines = text.split('\n');
  const segments = [];

  let currentSpeaker = '';
  let currentTimestamp = '';
  let currentText = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const speakerMatch = trimmed.match(SPEAKER_LINE_RE);

    if (speakerMatch) {
      if (currentSpeaker && currentText) {
        segments.push({
          speaker: currentSpeaker,
          timestamp: formatTimestamp(currentTimestamp),
          text: currentText.trim()
        });
      }

      currentSpeaker = speakerMatch[1];
      currentTimestamp = speakerMatch[2];
      currentText = '';
    } else {
      const cleanedText = trimmed.replace(/\s+/g, '');
      currentText += cleanedText;
    }
  }

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

module.exports = {
  formatTimestamp,
  parseTranscriptText
};

