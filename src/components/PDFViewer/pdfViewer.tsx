'use client';

import React, { useEffect, useRef } from 'react';
import { Viewer, Worker, ScrollMode, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import { RenderPageProps } from '@react-pdf-viewer/core';


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onBack: () => void;
}

const renderPage = (props: RenderPageProps) => {
  return (
    <>
      {props.canvasLayer.children}
      {/* Omit the text layer completely to prevent text selection */}
      {props.annotationLayer.children}
    </>
  );
};

export const PDFViewer = ({ pdfUrl, title, onBack }: PDFViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize plugins
  const scrollModePluginInstance = scrollModePlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const fullScreenPluginInstance = fullScreenPlugin({

    onEnterFullScreen: (zoom) => {
      zoom(SpecialZoomLevel.PageFit);

      const viewerElement = document.querySelector('.rpv-core__viewer');
      if (viewerElement) {
        viewerElement.classList.add('fullscreen-viewer');
      }
    },
    onExitFullScreen: (zoom) => {
      zoom(1);
      
       setTimeout(() => {
      const viewerElement = document.querySelector('.rpv-core__viewer');
      if (viewerElement) {
        viewerElement.classList.remove('fullscreen-viewer');
      }
    }, 100);
  }
});

  useEffect(() => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .rpv-core__viewer.rpv-core__viewer--full-screen,
    .rpv-core__viewer.fullscreen-viewer {
      height: 100vh !important;
    }
    
    .rpv-core__viewer.rpv-core__viewer--full-screen .rpv-core__inner-pages,
    .rpv-core__viewer.fullscreen-viewer .rpv-core__inner-pages {
      height: calc(100vh - 40px) !important;
    }
    
    /* Add minimum dimensions for the viewer */
    .rpv-core__viewer {
      min-height: 400px !important;
      min-width: 300px !important;
    }
    
    /* Ensure inner pages maintain proper dimensions */
    .rpv-core__inner-pages {
      min-height: 350px !important;
    }
  `;
  
  document.head.appendChild(styleElement);
  
  return () => {
    document.head.removeChild(styleElement);
  };
}, []);



  // Combine all plugins
  const plugins = [
    scrollModePluginInstance,
    toolbarPluginInstance,
    zoomPluginInstance,
    pageNavigationPluginInstance,
    fullScreenPluginInstance,
  ];

  return (
    <div ref={containerRef} className="container mx-auto p-2 md:p-4 flex flex-col max-h-screen">
      {/* Header with navigation */}
      <div className="flex items-center mb-2 md:mb-4 bg-[#1E1E1E] p-2 md:p-3 rounded-lg sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="p-1 md:p-2 rounded-full bg-[#2B2B2B] hover:bg-[#6544A3]/60 transition-colors mr-2 md:mr-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 md:h-5 md:w-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h1 className="text-sm md:text-xl font-bold text-white flex-1 truncate">
          {title}
        </h1>
      </div>
      
      {/* PDF Viewer with react-pdf-viewer */}
      <div className="flex-1 bg-[#2B2B2B] rounded-lg" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        {/* Custom toolbar with only the controls we want */}
        <div className="flex items-center justify-center p-1 md:p-2 bg-[#1E1E1E]">
          <Toolbar>
            {(props: ToolbarSlot) => {
              const {
                CurrentPageInput,
                EnterFullScreen,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                ZoomIn,
                ZoomOut,
              } = props;
              return (
                <div className="flex items-center space-x-1 md:space-x-2">
                  <div className="flex items-center space-x-0 md:space-x-1">
                    <ZoomOut>
                      {(props) => (
                        <button
                          className="p-1 text-gray-300 hover:text-white hover:bg-[#6544A3]/60 rounded"
                          onClick={props.onClick}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                      )}
                    </ZoomOut>
                    <ZoomIn>
                      {(props) => (
                        <button
                          className="p-1 text-gray-300 hover:text-white hover:bg-[#6544A3]/60 rounded"
                          onClick={props.onClick}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      )}
                    </ZoomIn>
                  </div>
                  <div className="flex items-center space-x-0 md:space-x-1">
                    <GoToPreviousPage>
                      {(props) => (
                        <button
                          className="p-1 text-gray-300 hover:text-white hover:bg-[#6544A3]/60 rounded"
                          onClick={props.onClick}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}
                    </GoToPreviousPage>
                    <div className="flex items-center space-x-1 text-white text-xs md:text-sm">
                      <CurrentPageInput /> / <NumberOfPages />
                    </div>
                    <GoToNextPage>
                      {(props) => (
                        <button
                          className="p-1 text-gray-300 hover:text-white hover:bg-[#6544A3]/60 rounded"
                          onClick={props.onClick}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </GoToNextPage>
                  </div>
                  <EnterFullScreen>
                    {(props) => (
                      <button
                        className="p-1 text-gray-300 hover:text-white hover:bg-[#6544A3]/60 rounded"
                        onClick={props.onClick}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    )}
                  </EnterFullScreen>
                </div>
              );
            }}
          </Toolbar>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfUrl}
              plugins={plugins}
              defaultScale={1}
              scrollMode={ScrollMode.Vertical}
               renderPage={renderPage}
              onDocumentLoad={() => {
                scrollModePluginInstance.switchScrollMode(ScrollMode.Vertical);
              }}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};
