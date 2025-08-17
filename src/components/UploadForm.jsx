import React, { useState } from 'react';
import { FileText, RotateCw } from 'lucide-react';
import Message from './Message';

const UploadForm = ({ onGenerateSummary, isLoading, message }) => {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('Summarize key decisions and action items in bullet points.');

  // Handles text file upload and reads the content into state.
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => setTranscript(e.target.result);
      reader.readAsText(file);
    }
  };

  const handleGenerateClick = () => {
    onGenerateSummary({ transcript, prompt });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-3xl mx-auto space-y-6 transition-all duration-300">
      <h2 className="text-3xl font-bold text-gray-800 text-center">AI Meeting Notes Summarizer</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Transcript File</label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer transition-colors duration-200" style={{'--hover-border': '#386641'}} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#386641'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d1d5db'}>
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2" style={{color: '#386641', '--tw-ring-color': '#386641'}} onMouseEnter={(e) => e.target.style.color = '#2d5a32'} onMouseLeave={(e) => e.target.style.color = '#386641'}>
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} accept=".txt" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">TXT files up to 10MB</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <label htmlFor="transcript-paste" className="block text-sm font-medium text-gray-700">Or Paste Transcript</label>
          <textarea
            id="transcript-paste"
            rows="8"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-3 border resize-y"
            style={{'--tw-ring-color': '#386641'}}
            onFocus={(e) => e.target.style.borderColor = '#386641'}
            placeholder="Paste your meeting notes or call transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-700">Custom Prompt</label>
          <input
            type="text"
            id="custom-prompt"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-3 border"
            style={{'--tw-ring-color': '#386641'}}
            onFocus={(e) => e.target.style.borderColor = '#386641'}
            placeholder="e.g., 'Highlight only action items.'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleGenerateClick}
          className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-base font-semibold text-white transition-all duration-200"
          style={{
            backgroundColor: isLoading ? '#9ca3af' : '#386641',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.target.style.backgroundColor = '#2d5a32';
          }}
          onMouseLeave={(e) => {
            if (!isLoading) e.target.style.backgroundColor = '#386641';
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <RotateCw className="animate-spin" size={20} />
              <span>Generating...</span>
            </div>
          ) : (
            'Generate Summary'
          )}
        </button>
      </div>
      <Message {...message} />
    </div>
  );
};

export default UploadForm;