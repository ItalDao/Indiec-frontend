// src/apps/client/songs/presentation/components/AudioPlayer.tsx

import { useState, useRef } from 'react';
import { colors } from '../../../../../shared/theme/colors';

interface AudioPlayerProps {
  audioUrl?: string;
  songTitle: string;
  onPlay: () => void;
}

export const AudioPlayer = ({ audioUrl, songTitle, onPlay }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      onPlay(); // Incrementar streams
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!audioUrl) {
    return (
      <div style={{
        padding: '2rem',
        background: colors.backgroundCard,
        borderRadius: '12px',
        textAlign: 'center',
        color: colors.textMuted,
        border: `1px solid ${colors.border}`,
      }}>
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>ICONO MUSICA</p>
        <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Audio no disponible</p>
        <p style={{ fontSize: '0.875rem' }}>
          Esta canción aún no tiene un archivo de audio cargado
        </p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '1.5rem',
      background: colors.backgroundCard,
      borderRadius: '12px',
      border: `1px solid ${colors.border}`
    }}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={togglePlay}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: colors.primary,
            border: 'none',
            color: colors.text,
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isPlaying ? 'PAUSE' : 'REPRODUCIR'}
        </button>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.875rem', color: colors.text, marginBottom: '0.5rem' }}>
            {songTitle}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: colors.textMuted, minWidth: '35px' }}>
              {formatTime(currentTime)}
            </span>
            
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: `linear-gradient(to right, ${colors.primary} 0%, ${colors.primary} ${(currentTime / duration) * 100}%, ${colors.border} ${(currentTime / duration) * 100}%, ${colors.border} 100%)`,
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            
            <span style={{ fontSize: '0.75rem', color: colors.textMuted, minWidth: '35px', textAlign: 'right' }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};