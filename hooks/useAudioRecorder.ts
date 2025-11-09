
import { useState, useRef, useCallback } from 'react';
import { RecordingStatus } from '../types';

export const useAudioRecorder = () => {
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string|null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    setPermissionError(null);
    if (recordingStatus !== 'idle' && recordingStatus !== 'stopped') return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingStatus('recording');
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: audioChunksRef.current[0]?.type || 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setRecordingStatus('stopped');
        stream.getTracks().forEach(track => track.stop()); // Release microphone
      };

      mediaRecorder.start();

    } catch (err) {
      console.error("Error accessing microphone:", err);
      setPermissionError("Microphone access denied. Please allow microphone permissions in your browser settings.");
      setRecordingStatus('denied');
    }
  }, [recordingStatus]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingStatus === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, [recordingStatus]);
  
  const resetRecording = useCallback(() => {
    setAudioBlob(null);
    if(audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setRecordingStatus('idle');
    audioChunksRef.current = [];
    mediaRecorderRef.current = null;
  }, [audioUrl]);


  return {
    recordingStatus,
    startRecording,
    stopRecording,
    audioBlob,
    audioUrl,
    resetRecording,
    permissionError,
  };
};
