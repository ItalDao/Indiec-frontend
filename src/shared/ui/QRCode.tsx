import React from 'react';
import { Download } from 'lucide-react';

interface QRCodeComponentProps {
  value: string;
  size?: number;
  downloadable?: boolean;
  downloadFileName?: string;
}

export const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  value,
  size = 256,
  downloadable = true,
  downloadFileName = 'qr-code.png',
}) => {
  // Usar API pública para generar QR (sin dependencias externas)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error descargando QR:', err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          padding: '16px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={qrUrl}
          alt="QR Code"
          style={{
            width: size,
            height: size,
            display: 'block',
          }}
        />
      </div>

      {downloadable && (
        <button
          onClick={handleDownload}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Download size={16} />
          Descargar QR
        </button>
      )}
    </div>
  );
};
