import React, { useState } from 'react';
import axios from 'axios';
import { Send, Edit, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import Message from './Message';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SummaryDisplay = ({ summary, onUpdateSummary, onShareSummary }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary.editedSummary);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedSummary(summary.editedSummary);
    }
  };

  const handleSaveEdit = async () => {
    setMessage({ text: 'Saving edits...', type: 'info' });
    try {
      const response = await axios.put(`${API_BASE_URL}/summaries/${summary.id}`, { editedSummary });
      onUpdateSummary(response.data);
      setIsEditing(false);
      setMessage({ text: 'Edits saved successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to save edits. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-3xl mx-auto transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Summary</h2>
        <div className="space-x-2">
          {isEditing ? (
            <button onClick={handleSaveEdit} className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 shadow-md" title="Save">
              <Save size={20} />
            </button>
          ) : (
            <button onClick={handleToggleEdit} className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-200 shadow-md" title="Edit">
              <Edit size={20} />
            </button>
          )}
          <button onClick={() => onShareSummary(summary.id)} className="p-3 rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 shadow-md" style={{backgroundColor: '#386641'}} title="Share">
            <Send size={20} />
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          rows="15"
          className="w-full rounded-lg border-gray-300 shadow-sm sm:text-sm p-4 border resize-y"
          style={{borderColor: '#386641', '--tw-ring-color': '#386641'}}
          onFocus={(e) => e.target.style.borderColor = '#386641'}
          value={editedSummary}
          onChange={(e) => setEditedSummary(e.target.value)}
        />
      ) : (
        <div className="prose max-w-none p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 whitespace-pre-wrap leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary.editedSummary}</ReactMarkdown>
        </div>
      )}
      <Message {...message} />
    </div>
  );
};

export default SummaryDisplay;
