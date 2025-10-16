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
        console.log("Fetching document from:", fileUrl);

        // For DOC files, use Google Docs Viewer as a fallback
        if (fileUrl.toLowerCase().endsWith('.doc') || fileUrl.toLowerCase().includes('.doc?')) {
          // Create an iframe with Google Docs Viewer with zoom parameter
          setHtml(`
            <div style="width:100%; height:100%;">
              <iframe 
                src="https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true&zoom=150" 
                width="100%" 
                height="100%" 
                style="border: none; transform: scale(1.2); transform-origin: top center;"
                frameborder="0">
              </iframe>
            </div>
          `);
          setLoading(false);
          return;
        }

        // For DOCX files, use mammoth
        const fetchOptions = {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          cache: 'no-store'
        };
        
        const response = await fetch(`${fileUrl}${fileUrl.includes('?') ? '&' : '?'}t=${Date.now()}`, fetchOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        console.log("Document fetched, size:", arrayBuffer.byteLength);
        
        const result = await mammoth.convertToHtml({ arrayBuffer });
        console.log("Document converted successfully");
        setHtml(result.value);
      } catch (e) {
        setError('Error loading document. Please try again later.');
        console.error('Error rendering document:', e);
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