
import React from 'react';

export const MicrophoneIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8h-1a6 6 0 11-12 0H3a7.001 7.001 0 006 6.93V17H7v1h6v-1h-2v-2.07z" clipRule="evenodd" />
  </svg>
);

export const StopIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
  </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.586l-1.707 1.707A1 1 0 003.586 8L5 6.586V5a1 1 0 00-1-1H2.5a1 1 0 000 2H4v1.586l-1.707 1.707A1 1 0 003.586 12L5 10.586V9a1 1 0 00-1-1H2.5a1 1 0 000 2H4v1.586l-1.293 1.293a1 1 0 101.414 1.414L5 13.414V15a1 1 0 001 1h1.586l1.707 1.707a1 1 0 001.414 0L12.414 16H14a1 1 0 001-1v-1.586l1.293-1.293a1 1 0 10-1.414-1.414L13 13.414V12h1.5a1 1 0 000-2H13V8.586l1.707-1.707a1 1 0 00-1.414-1.414L12 6.586V5a1 1 0 00-1-1h-1.586l-1.707-1.707A1 1 0 006.414 2H5zm11.293 9.293a1 1 0 000 1.414L17 13.414V15a1 1 0 001 1h.5a1 1 0 000-2H18v-1.586l.707-.707a1 1 0 00-1.414-1.414L16.586 11H15a1 1 0 00-1 1v1.586l-.707.707z" clipRule="evenodd" />
  </svg>
);

export const ClipboardIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);

export const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);
