import React from 'react';
import '../styles/global.css';

interface LoadingOverlayProps {
  progress?: number;
}

export default function LoadingOverlay({ progress }: LoadingOverlayProps) {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
      {progress !== undefined && (
        <div className="progress-text">
          Uploading... {Math.round(progress)}%
        </div>
      )}
    </div>
  );
} 