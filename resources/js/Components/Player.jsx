// resources/js/Components/Player.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Player({ previewUrl, title, artist, onClose }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!previewUrl) return;

    audioRef.current.pause();
    audioRef.current.src = previewUrl;
    audioRef.current.play().catch(() => {});
  }, [previewUrl]);

  if (!previewUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 w-80 p-3 card-soft shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="font-semibold text-white truncate">{title}</div>
          <div className="text-sm text-slate-300 truncate">{artist}</div>
        </div>

        <div className="flex items-center gap-2">
          <audio ref={audioRef} controls className="w-40">
            <source src={previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
              }
              onClose && onClose();
            }}
            className="ml-2 px-2 py-1 rounded bg-red-600 text-white"
            title="Close player"
          >
            ✕
          </button>
        </div>
      </div>
    </motion.div>
  );
}
