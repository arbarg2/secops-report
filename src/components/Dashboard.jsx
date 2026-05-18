import React, { useState } from 'react';
import Dashboard from './Dashboard';

export default function IngestionPage() {
  const [ingestionFiles, setIngestionFiles] = useState([]);
  const [ingestedData, setIngestedData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const addIngestionFile = () => {
    setIngestionFiles([...ingestionFiles, { id: Date.now(), file: null }]);
  };

  const handleFileUpload = (index, file) => {
    const newFiles = [...ingestionFiles];
    newFiles[index].file = file;
    setIngestionFiles(newFiles);
  };

  const handleIngest = () => {
    console.log('Ingesting:', ingestionFiles);
    setIngestedData(ingestionFiles); // Pass uploaded files as ingested data
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard data={ingestedData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Data Ingestion</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
          <p className="text-slate-400 mt-2">Upload security and operational data for analysis</p>
        </div>

        {/* Add File Button */}
        <button
          onClick={addIngestionFile}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 mb-8"
        >
          <span className="text-xl">+</span> Add Ingest File
        </button>

        {/* File Upload Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {ingestionFiles.map((fileObj, index) => (
            <div
              key={fileObj.id}
              className="group relative"
            >
              <div
                className="border-2 border-dashed border-slate-600 hover:border-cyan-500 p-6 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 flex flex-col items-center justify-center h-40 cursor-pointer transition-all duration-200 backdrop-blur-sm"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  handleFileUpload(index, file);
                }}
              >
                {fileObj.file ? (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-green-400 font-semibold text-sm">{fileObj.file.name}</p>
                    <p className="text-green-400/70 text-xs mt-1">Uploaded</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-slate-700 flex items-center justify-center group-hover:bg-slate-600 transition-colors">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-slate-300 font-medium text-sm">Drag & Drop</p>
                    <p className="text-slate-500 text-xs mt-1">CSV or JSON file</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ingest Button */}
        {ingestionFiles.length > 0 && (
          <div className="flex gap-4">
            <button
              onClick={handleIngest}
              className="flex-1 md:flex-none bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
            >
              Ingest Data
            </button>
            <div className="text-slate-400 text-sm flex items-center">
              {ingestionFiles.filter(f => f.file).length} / {ingestionFiles.length} files ready
            </div>
          </div>
        )}

        {/* Empty State */}
        {ingestionFiles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-slate-500">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-slate-400">Click "Add Ingest File" to start uploading your data</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
