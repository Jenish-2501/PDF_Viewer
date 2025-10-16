import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';

const DocxViewer = ({ fileUrl }) => {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndRenderDocx = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setHtml(result.value);
      } catch (e) {
        setError('Error loading document. Please try again later.');
        console.error('Error rendering DOCX:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRenderDocx();
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4 bg-red-100 border border-red-400 rounded">{error}</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-inner overflow-auto h-full prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default DocxViewer;