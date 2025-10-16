import React, { Suspense, lazy } from 'react';
import { getFileTypeFromUrl } from '../utils/fileDetector';

const PDFViewer = lazy(() => import('./viewers/PDFViewer'));
const ImageViewer = lazy(() => import('./viewers/ImageViewer'));
const DocxViewer = lazy(() => import('./viewers/DocxViewer'));
const ExcelViewer = lazy(() => import('./viewers/ExcelViewer'));

const Loading = () => <div className="flex justify-center items-center h-full"><div>Loading...</div></div>;

const FileViewer = ({ fileUrl }) => {
  const fileType = getFileTypeFromUrl(fileUrl);

  const renderViewer = () => {
    switch (fileType) {
      case 'pdf':
        return <PDFViewer fileUrl={fileUrl} />;
      case 'image':
        return <ImageViewer fileUrl={fileUrl} />;
      case 'docx':
        return <DocxViewer fileUrl={fileUrl} />;
      case 'excel':
        return <ExcelViewer fileUrl={fileUrl} />;
      default:
        return <div className="text-red-500 text-center p-4">Unsupported file type.</div>;
    }
  };

  return (
    <div className="w-full h-screen">
        <Suspense fallback={<Loading />}>
            {renderViewer()}
        </Suspense>
    </div>
  );
};

export default FileViewer;