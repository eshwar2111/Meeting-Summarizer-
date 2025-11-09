
import React from 'react';
import { RecordingStatus } from '../types';
import { MicrophoneIcon, StopIcon } from './icons';

interface RecorderControlProps {
  status: RecordingStatus;
  onStart: () => void;
  onStop: () => void;
}

export const RecorderControl: React.FC<RecorderControlProps> = ({ status, onStart, onStop }) => {
  const isRecording = status === 'recording';

  const handleClick = () => {
    if (isRecording) {
      onStop();
    } else {
      onStart();
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 ${
          isRecording 
          ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' 
          : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'
        }`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? <StopIcon /> : <MicrophoneIcon />}
        {isRecording && <span className="absolute w-24 h-24 bg-red-500 rounded-full animate-ping -z-10"></span>}
      </button>
    </div>
  );
};
