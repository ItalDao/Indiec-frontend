// src/apps/client/songs/presentation/components/AudioPlayer.tsx

import { useState, useRef } from 'react';
import { colors } from '../../../../../shared/theme/colors';
import { Icons } from './Icons';

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
        padding: '32px',
        background: `${colors.secondary}10`,
        borderRadius: '12px',
        textAlign: 'center',
        color: colors.textMuted,
        border: `1px solid ${colors.border}`,
      }}>
        <div style={{ width: '48px', height: '48px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.secondary }}>
          <Icons.Music />
        </div>
        <p style={{ fontSize: '15px', fontWeight: '600', color: colors.text, marginBottom: '8px' }}>Audio no disponible</p>
        <p style={{ fontSize: '13px', color: colors.textMuted, margin: 0 }}>
          Esta canción aún no tiene un archivo de audio cargado
        </p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '28px',
      background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6), rgba(45, 27, 105, 0.4))',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      border: `1px solid rgba(139, 92, 246, 0.3)`,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Title */}
      <p style={{ 
        fontSize: '12px', 
        fontWeight: '700',
        color: '#cbd5e1', 
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        marginBottom: '16px',
        margin: '0 0 16px 0',
      }}>
        Reproducción
      </p>

      {/* Play button and progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <button
          onClick={togglePlay}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: colors.primary,
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            boxShadow: `0 4px 12px ${colors.primary}40`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}60`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${colors.primary}40`;
          }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isPlaying ? <Icons.Pause /> : <Icons.Play />}
          </div>
        </button>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.2)',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>
              {formatTime(currentTime)}
            </span>
            <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Song title */}
      <p style={{ 
        fontSize: '13px', 
        color: '#cbd5e1', 
        margin: 0,
        fontWeight: '500',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {songTitle}
      </p>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          borderRadius: 50%;
          background: ${colors.primary};
          cursor: pointer;
          box-shadow: 0 2px 4px ${colors.primary}60;
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          borderRadius: 50%;
          background: ${colors.primary};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px ${colors.primary}60;
        }
      `}</style>
    </div>
  );
};