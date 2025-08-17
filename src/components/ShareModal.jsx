import React, { useState } from 'react';
import { X } from 'lucide-react';
import Message from './Message';

const ShareModal = ({ isOpen, onClose, onShare }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleShareClick = async () => {
    if (!recipientEmail) {
      setMessage({ text: 'Please enter a recipient email.', type: 'error' });
      return;
    }
    
    try {
      await onShare(recipientEmail);
      setMessage({ text: `Summary shared with ${recipientEmail}!`, type: 'success' });
      setRecipientEmail('');
      setTimeout(onClose, 2000);
    } catch (error) {
      setMessage({ text: 'Failed to send email. Please try again.', type: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm transition-all duration-300">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onClose}>
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">Share Summary</h3>
        <div className="mb-4">
          <label htmlFor="recipient-email" className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
          <input
            type="email"
            id="recipient-email"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-3 border"
            style={{'--tw-ring-color': '#386641'}}
            onFocus={(e) => e.target.style.borderColor = '#386641'}
            placeholder="Enter email address"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleShareClick}
          className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-base font-semibold text-white transition-colors duration-200"
          style={{backgroundColor: '#386641'}}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2d5a32'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#386641'}
        >
          Send
        </button>
        <Message {...message} />
      </div>
    </div>
  );
};

export default ShareModal;