import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import SummaryDisplay from './components/SummaryDisplay';
import ShareModal from './components/ShareModal';
import Message from './components/Message';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [summary, setSummary] = useState(() => {
    try {
      const storedSummary = localStorage.getItem('notes_summarizer_summary');
      return storedSummary ? JSON.parse(storedSummary) : null;
    } catch (error) {
      console.error("Failed to parse summary from localStorage:", error);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (summary) {
      localStorage.setItem('notes_summarizer_summary', JSON.stringify(summary));
    }
  }, [summary]);

  const handleGenerateSummary = async ({ transcript, prompt }) => {
    if (!transcript.trim()) {
      setMessage({ text: 'Please upload or paste a transcript.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: 'Generating summary...', type: 'info' });

    try {
      const response = await axios.post(`${API_BASE_URL}/summaries`, {
        transcript,
        prompt,
      });
      setSummary(response.data);
      setMessage({ text: 'Summary generated successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to generate summary. Please check your backend connection.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSummary = (updatedSummary) => {
    setSummary(updatedSummary);
  };

  const handleShareSummary = async (summaryId, recipientEmail) => {
    try {
      await axios.post(`${API_BASE_URL}/summaries/${summaryId}/share`, { recipientEmail });
    } catch (error) {
      throw new Error('Sharing failed.');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f3f4f6;
          color: #374151;
        }
        .prose {
          white-space: pre-wrap;
          font-family: 'Inter', sans-serif;
        }
        .prose h1, .prose h2, .prose h3 { font-weight: 700; }
        .prose strong { font-weight: 600; }
        .prose li { list-style-type: disc; margin-left: 1.5rem; }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.2/axios.min.js"></script>
      <div className="min-h-screen flex flex-col items-center p-4">
        <UploadForm onGenerateSummary={handleGenerateSummary} isLoading={isLoading} message={message} />
        {summary && (
          <SummaryDisplay
            summary={summary}
            onUpdateSummary={handleUpdateSummary}
            onShareSummary={() => setShowShareModal(true)}
          />
        )}
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          onShare={(recipientEmail) => handleShareSummary(summary.id, recipientEmail)}
        />
      </div>
    </>
  );
};

export default App;