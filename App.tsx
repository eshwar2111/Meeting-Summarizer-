
import React, { useState, useCallback } from 'react';
import { useAudioRecorder } from './hooks/useAudioRecorder';
import { transcribeAudio, summarizeText } from './services/geminiService';
import { blobToBase64 } from './utils/audioUtils';
import { RecorderControl } from './components/RecorderControl';
import { ResultCard } from './components/ResultCard';
import { SparklesIcon } from './components/icons';

type AppStatus = 'idle' | 'recording' | 'recorded' | 'processing' | 'summarized' | 'error';

const App: React.FC = () => {
  const { recordingStatus, startRecording, stopRecording, audioBlob, audioUrl, resetRecording, permissionError } = useAudioRecorder();
  const [transcript, setTranscript] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [appStatus, setAppStatus] = useState<AppStatus>('idle');

  const handleStartRecording = () => {
    resetState();
    startRecording();
    setAppStatus('recording');
  };
  
  const handleStopRecording = () => {
    stopRecording();
    setAppStatus('recorded');
  };

  const resetState = () => {
    resetRecording();
    setTranscript('');
    setSummary('');
    setError(null);
    setAppStatus('idle');
  };

  const handleTranscribeAndSummarize = useCallback(async () => {
    if (!audioBlob) return;

    setAppStatus('processing');
    setError(null);
    setTranscript('');
    setSummary('');

    try {
      const base64Audio = await blobToBase64(audioBlob);
      
      const transcription = await transcribeAudio(base64Audio, audioBlob.type);
      setTranscript(transcription);

      if (transcription) {
        const summarization = await summarizeText(transcription);
        setSummary(summarization);
        setAppStatus('summarized');
      } else {
        throw new Error("Transcription failed, cannot summarize.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unknown error occurred.');
      setAppStatus('error');
    }
  }, [audioBlob]);

  const getStatusMessage = () => {
    switch(appStatus) {
      case 'idle': return "Click record to start";
      case 'recording': return "Recording audio...";
      case 'recorded': return "Audio recorded. Ready to summarize.";
      case 'processing': return "Processing... Transcribing and summarizing.";
      case 'summarized': return "Here is your summary!";
      case 'error': return "An error occurred.";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Gemini Meeting Summarizer
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Record, Transcribe, and Summarize your meetings with AI.
          </p>
        </header>

        <main className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center justify-center space-y-6">
              <RecorderControl
                status={recordingStatus}
                onStart={handleStartRecording}
                onStop={handleStopRecording}
              />
              {audioUrl && (
                <div className="w-full space-y-4">
                  <audio src={audioUrl} controls className="w-full" />
                   <button
                    onClick={handleTranscribeAndSummarize}
                    disabled={appStatus === 'processing' || !audioBlob}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    <SparklesIcon />
                    {appStatus === 'processing' ? 'Processing...' : 'Transcribe & Summarize'}
                  </button>
                </div>
              )}
               {permissionError && <p className="text-red-400 text-sm mt-2">{permissionError}</p>}
               <p className="text-gray-400 text-sm h-5">{getStatusMessage()}</p>
            </div>
            
            <div className="md:w-2/3 space-y-6">
                <ResultCard title="Transcript" content={transcript} isLoading={appStatus === 'processing' && !transcript} onReset={resetState}/>
                <ResultCard title="Summary" content={summary} isLoading={appStatus === 'processing' && transcript !== '' && !summary} isSummary={true}/>
            </div>
          </div>
           {error && (
              <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                  <p className="font-bold">Error:</p>
                  <p>{error}</p>
              </div>
            )}
        </main>
      </div>
       <footer className="text-center text-gray-500 mt-8">
          <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
