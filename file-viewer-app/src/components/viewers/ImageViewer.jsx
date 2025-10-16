import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import React from 'react';

const Controls = ({ zoomIn, zoomOut, resetTransform, centerView }) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
    <button onClick={() => zoomIn()} className="p-2 rounded-full hover:bg-gray-200 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>
    </button>
    <button onClick={() => zoomOut()} className="p-2 rounded-full hover:bg-gray-200 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
    </button>
    <button onClick={() => resetTransform()} className="p-2 rounded-full hover:bg-gray-200 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20L20 4" /></svg>
    </button>
    <button onClick={() => centerView(1)} className="p-2 rounded-full hover:bg-gray-200 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5z" clipRule="evenodd" />
        </svg>
    </button>
  </div>
);

const ImageViewer = ({ fileUrl }) => {
  return (
    <div className="w-full h-full bg-black relative group">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
          <React.Fragment>
            <div className="absolute top-4 right-4 z-10 bg-black/50 text-white text-sm px-2 py-1 rounded">
              {(rest.state.scale * 100).toFixed(0)}%
            </div>
            <Controls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} centerView={centerView} />
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img src={fileUrl} alt="view" className="max-w-full max-h-full object-contain shadow-lg" />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ImageViewer;