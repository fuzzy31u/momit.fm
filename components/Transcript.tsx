import { useState } from 'react';
import styles from '../styles/Transcript.module.css';

interface TranscriptSegment {
  speaker: string;
  timestamp: string;
  text: string;
}

interface TranscriptProps {
  segments: TranscriptSegment[];
  audioRef?: React.RefObject<HTMLAudioElement>;
}

export default function Transcript({ segments, audioRef }: TranscriptProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSegments = segments.filter(segment =>
    segment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.speaker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTimestampClick = (timestamp: string) => {
    if (!audioRef?.current) return;

    // Parse timestamp (HH:MM:SS or MM:SS.mmm format)
    const parts = timestamp.split(':');
    let seconds = 0;

    if (parts.length === 3) {
      seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
    } else if (parts.length === 2) {
      seconds = parseInt(parts[0]) * 60 + parseFloat(parts[1]);
    }

    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  };

  return (
    <div className={styles.transcriptContainer}>
      <div className={styles.transcriptHeader}>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '▼' : '▶'} 文字起こし
        </button>

        {isExpanded && (
          <input
            type="text"
            className={styles.searchBox}
            placeholder="文字起こしを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>

      {isExpanded && (
        <div className={styles.transcriptContent}>
          {filteredSegments.length === 0 ? (
            <p className={styles.noResults}>検索結果がありません</p>
          ) : (
            filteredSegments.map((segment, index) => (
              <div key={index} className={styles.segment}>
                <div className={styles.segmentHeader}>
                  {segment.speaker && (
                    <span className={styles.speaker}>{segment.speaker}</span>
                  )}
                  <button
                    className={styles.timestamp}
                    onClick={() => handleTimestampClick(segment.timestamp)}
                    title="クリックして再生位置を移動"
                  >
                    {segment.timestamp}
                  </button>
                </div>
                <p className={styles.segmentText}>{segment.text}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}