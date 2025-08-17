import React from 'react';

const Message = ({ text, type }) => {
  if (!text) return null;
  const colorClasses = {
    info: 'text-white shadow-md',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
  };
  const customStyle = type === 'info' ? { backgroundColor: '#386641' } : {};
  return (
    <div className={`mt-4 p-3 rounded-md shadow-md text-sm font-medium ${colorClasses[type]}`} style={customStyle}>
      {text}
    </div>
  );
};

export default Message;