import React from 'react';

const FileTypeSelector = ({ onSelectFileType }) => {
  const fileTypes = [
    { name: 'PDF', type: 'pdf' },
    { name: 'Image', type: 'image' },
    { name: 'DOCX', type: 'docx' },
    { name: 'Excel', type: 'excel' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Universal File Viewer</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {fileTypes.map(({ name, type }) => (
            <div
            key={type}
            onClick={() => onSelectFileType(type)}
            className="w-40 h-40 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
            data-testid={`file-type-${type}`}
            >
            <span className="text-6xl mb-2">📄</span>
            <span className="text-xl font-semibold">{name}</span>
            </div>
        ))}
        </div>
    </div>
  );
};

export default FileTypeSelector;