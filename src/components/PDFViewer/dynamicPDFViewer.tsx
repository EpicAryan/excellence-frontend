// components/PDFViewer/DynamicPDFViewer.tsx (or similar path)
import dynamic from 'next/dynamic';
import React from 'react';

// Assuming your PDFViewer component is exported as a named export 'PDFViewer'
// Adjust the import path '../pdfViewer' to the actual location of your PDFViewer.tsx file
export const DynamicPDFViewer = dynamic(
  () => import('./pdfViewer').then((mod) => mod.PDFViewer), // Or './pdfViewer' if in the same folder
  {
    ssr: false, // This is KEY: ensures the component is client-side only
    loading: () => <div style={{ textAlign: 'center', padding: '20px' }}>Loading PDF Viewer...</div>, // Optional: Show a loading message
  }
);
