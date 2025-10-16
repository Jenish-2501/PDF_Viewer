import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import React, { useState, useRef } from 'react';

const Controls = ({ 
  zoomIn, 
  zoomOut, 
  resetTransform, 
  centerView, 
  rotateClockwise, 
  rotateCounterClockwise,
  rotation 
}) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
    <button 
      onClick={() => zoomOut()} 
      className="p-2 px-3 rounded-full hover:bg-gray-200 transition text-sm font-medium"
      aria-label="Zoom out"
    >
      −
    </button>
    <button 
      onClick={() => zoomIn()} 
      className="p-2 px-3 rounded-full hover:bg-gray-200 transition text-sm font-medium"
      aria-label="Zoom in"
    >
      +
    </button>
    <button 
      onClick={rotateCounterClockwise} 
      className="p-2 rounded-full hover:bg-gray-200 transition text-lg"
      aria-label="Rotate counter-clockwise"
    >
      ⟲
    </button>
    <button 
      onClick={rotateClockwise} 
      className="p-2 rounded-full hover:bg-gray-200 transition text-lg"
      aria-label="Rotate clockwise"
    >
      ⟳
    </button>
    <button 
      onClick={() => {
        resetTransform();
      }} 
      className="p-2 px-3 rounded-full hover:bg-gray-200 transition text-sm font-medium"
    >
      Reset
    </button>
    <button 
      onClick={() => centerView(1)} 
      className="p-2 px-3 rounded-full hover:bg-gray-200 transition text-sm font-medium"
    >
      Center
    </button>
  </div>
);

const ImageViewer = ({ fileUrl }) => {
  const [rotation, setRotation] = useState(0);
  const transformComponentRef = useRef(null);

  if (!fileUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white bg-black">
        No image available
      </div>
    );
  }

  const handleRotateClockwise = () => {
    setRotation(r => (r + 90) % 360);
  };

  const handleRotateCounterClockwise = () => {
    setRotation(r => (r - 90 + 360) % 360);
  };

  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.5}
        maxScale={8}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
        doubleClick={{ mode: 'zoomIn', step: 0.7 }}
        alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
      >
        {({ zoomIn, zoomOut, resetTransform, centerView, state }) => (
          <>
            {/* Zoom indicator */}
            <div className="absolute top-4 right-4 z-10 bg-black/70 text-white text-sm px-3 py-1.5 rounded-md font-medium">
              {(state?.scale ? (state.scale * 100).toFixed(0) : 100)}%
            </div>

            {/* Rotation indicator */}
            {rotation !== 0 && (
              <div className="absolute top-4 left-4 z-10 bg-black/70 text-white text-sm px-3 py-1.5 rounded-md font-medium">
                {rotation}°
              </div>
            )}

            <Controls
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              resetTransform={() => {
                resetTransform();
                setRotation(0);
              }}
              centerView={centerView}
              rotateClockwise={handleRotateClockwise}
              rotateCounterClockwise={handleRotateCounterClockwise}
              rotation={rotation}
            />

            <TransformComponent
              ref={transformComponentRef}
              wrapperStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              contentStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={fileUrl}
                  alt="Viewer"
                  className="max-w-full max-h-full object-contain select-none"
                  draggable={false}
                  style={{
                    display: 'block',
                    maxWidth: rotation % 180 === 0 ? '90vw' : '90vh',
                    maxHeight: rotation % 180 === 0 ? '90vh' : '90vw',
                  }}
                  onError={(e) => {
                    console.error('Image load error:', e);
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Error%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ImageViewer;
