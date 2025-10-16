import React, { useState, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const resizeObserverOptions = {};
const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const containerRef = useRef(null);
  const handle = useFullScreenHandle();

  const onResize = useCallback((entries) => {
    const [entry] = entries;
    if (entry) {
        // We are passing the width of the container to the PDF viewer.
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
  }

  const handleZoomIn = () => setScale(s => Math.min(s + 0.25, 3));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.25, 0.25));
  const handleRotateClockwise = () => setRotation(r => (r + 90) % 360);
  const handleRotateCounterClockwise = () => setRotation(r => (r - 90 + 360) % 360);

  const goToPrevPage = () => setPageNumber(p => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber(p => Math.min(p + 1, numPages));

  const fitToWidth = () => {
    if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // A4 page ratio
        setScale(containerWidth / (8.27 * 72));
    }
  };

  const fitToPage = () => {
      if (containerRef.current) {
          const containerWidth = containerRef.current.clientWidth;
          const containerHeight = containerRef.current.clientHeight;
          // A4 page ratio
          const scaleWidth = containerWidth / (8.27 * 72);
          const scaleHeight = containerHeight / (11.69 * 72);
          setScale(Math.min(scaleWidth, scaleHeight));
      }
  };

  return (
    <FullScreen handle={handle} className="h-full flex flex-col bg-gray-800">
      <div className="flex items-center justify-center p-2 bg-black text-white space-x-2 shadow-lg z-10 flex-wrap">
        <button onClick={() => setShowThumbnails(!showThumbnails)} className="p-2 rounded-full hover:bg-gray-700 transition">☰</button>
        <button onClick={handleRotateCounterClockwise} className="p-2 rounded-full hover:bg-gray-700 transition">⟲</button>
        <button onClick={handleRotateClockwise} className="p-2 rounded-full hover:bg-gray-700 transition">⟳</button>
        <button onClick={handleZoomOut} disabled={scale <= 0.25} className="p-2 rounded-full hover:bg-gray-700 transition">-</button>
        <span className="min-w-[40px] text-center">{(scale * 100).toFixed(0)}%</span>
        <button onClick={handleZoomIn} disabled={scale >= 3} className="p-2 rounded-full hover:bg-gray-700 transition">+</button>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="p-2 rounded-full hover:bg-gray-700 transition">‹</button>
        <span>Page {pageNumber} of {numPages || '--'}</span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="p-2 rounded-full hover:bg-gray-700 transition">›</button>
        <button onClick={fitToWidth} className="p-2 rounded-md hover:bg-gray-700 transition text-sm">Fit Width</button>
        <button onClick={fitToPage} className="p-2 rounded-md hover:bg-gray-700 transition text-sm">Fit Page</button>
        <button onClick={handle.enter} className="p-2 rounded-full hover:bg-gray-700 transition">⛶</button>
        <a href={fileUrl} download target="_blank" rel="noopener noreferrer" className="ml-auto p-2 rounded-full hover:bg-gray-700 transition">↓</a>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {showThumbnails && (
          <div className="w-48 bg-gray-900 overflow-y-auto p-2 space-y-2">
            <Document file={fileUrl} loading="" >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} onClick={() => setPageNumber(index + 1)} className={`cursor-pointer border-2 ${pageNumber === index + 1 ? 'border-blue-500' : 'border-transparent'}`}>
                  <Page pageNumber={index + 1} width={150} />
                </div>
              ))}
            </Document>
          </div>
        )}
        <div className="flex-1 overflow-auto text-center" ref={containerRef}>
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadProgress={() => setIsLoading(true)}
            loading={<div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>}
            error={<div className="text-red-500 text-center p-4 bg-red-100 border border-red-400 rounded">Failed to load PDF file.</div>}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
            />
          </Document>
        </div>
      </div>
    </FullScreen>
  );
};

export default PDFViewer;