import React, { useState } from 'react';
import FileTypeSelector from './components/FileTypeSelector';
import FileViewer from './components/FileViewer';
import { PDF_URL, IMAGE_URL, DOCX_URL, EXCEL_URL } from './utils/fileUrls';
import './App.css';

const fileTypeUrls = {
  pdf: PDF_URL,
  image: IMAGE_URL,
  docx: DOCX_URL,
  excel: EXCEL_URL,
};

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectFileType = (fileType) => {
    setSelectedFile(fileTypeUrls[fileType]);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  return (
    <main className="App bg-gray-100 min-h-screen">
      {selectedFile ? (
        <>
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 z-20 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Back to Selector
          </button>
          <FileViewer fileUrl={selectedFile} />
        </>
      ) : (
        <FileTypeSelector onSelectFileType={handleSelectFileType} />
      )}
    </main>
  );
}

export default App;