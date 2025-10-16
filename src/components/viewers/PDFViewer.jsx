import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "pdfjs-dist/web/pdf_viewer.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// Fix PDF worker configuration for Vite
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
  const handle = useFullScreenHandle();
  
  // Use Google PDF Viewer as a fallback to avoid CORS issues
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const zoomIn = () => setScale(s => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale(s => Math.max(s - 0.25, 0.25));
  const rotateClockwise = () => setRotation(r => (r + 90) % 360);
  const rotateCounterClockwise = () => setRotation(r => (r - 90 + 360) % 360);
  const goToPrevPage = () => setPageNumber(p => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber(p => Math.min(p + 1, numPages));

  const fitToWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      setScale(containerWidth / (8.27 * 72));
    }
  };

  const fitToPage = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const scaleWidth = containerWidth / (8.27 * 72);
      const scaleHeight = containerHeight / (11.69 * 72);
      setScale(Math.min(scaleWidth, scaleHeight));
    }
  };

  return (
    <FullScreen handle={handle} className="h-full flex flex-col bg-gray-800">
      {/* Toolbar */}
      <div className="flex items-center justify-center p-2 bg-black text-white space-x-2 shadow-lg flex-wrap">
        <button onClick={rotateCounterClockwise}>⟲</button>
        <button onClick={rotateClockwise}>⟳</button>
        <button onClick={zoomOut} disabled={scale <= 0.25}>-</button>
        <span>{(scale * 100).toFixed(0)}%</span>
        <button onClick={zoomIn} disabled={scale >= 3}>+</button>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>‹</button>
        <span>Page {pageNumber} of {numPages || '--'}</span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>›</button>
        <button onClick={fitToWidth}>Fit Width</button>
        <button onClick={fitToPage}>Fit Page</button>
        <button onClick={handle.enter}>⛶</button>
        <a href={fileUrl} download target="_blank" rel="noopener noreferrer">↓</a>
      </div>

      {/* PDF Container */}
      <div className="flex-1 overflow-auto" ref={containerRef}>
        <iframe 
          src={googleViewerUrl}
          className="w-full h-full border-none"
          title="PDF Viewer"
        />
      </div>
    </FullScreen>
  );
};

export default PDFViewer;
