import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExcelViewer = ({ fileUrl }) => {
  const [sheets, setSheets] = useState({});
  const [activeSheet, setActiveSheet] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndRenderExcel = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetData = {};
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const html = XLSX.utils.sheet_to_html(worksheet);
          sheetData[sheetName] = html;
        });

        setSheets(sheetData);
        setActiveSheet(workbook.SheetNames[0]);
      } catch (e) {
        setError('Error loading Excel file. Please try again later.');
        console.error('Error rendering Excel:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRenderExcel();
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
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-2 bg-white border-b border-gray-200 flex items-center">
        <label htmlFor="sheet-selector" className="mr-2 font-semibold text-gray-700">Sheet:</label>
        <select
          id="sheet-selector"
          value={activeSheet}
          onChange={(e) => setActiveSheet(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.keys(sheets).map(sheetName => (
            <option key={sheetName} value={sheetName}>
              {sheetName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <style>
          {`
            .excel-table table {
              width: 100%;
              border-collapse: collapse;
              font-size: 0.875rem;
            }
            .excel-table th, .excel-table td {
              border: 1px solid #e2e8f0;
              padding: 0.5rem 0.75rem;
              text-align: left;
            }
            .excel-table th {
              background-color: #f7fafc;
              font-weight: 600;
              position: sticky;
              top: 0;
              z-index: 10;
            }
          `}
        </style>
        <div className="excel-table" dangerouslySetInnerHTML={{ __html: sheets[activeSheet] }} />
      </div>
    </div>
  );
};

export default ExcelViewer;