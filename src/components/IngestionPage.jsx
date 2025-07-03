import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IngestionPage() {
  const [ingestionFiles, setIngestionFiles] = useState([]);
  const navigate = useNavigate();

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
    alert('Data ingested (mock). Check console for details.');

    // Navigate to Dashboard after ingest
    navigate('/dashboard');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Ingestion</h1>

      <button
        onClick={addIngestionFile}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Ingest File
      </button>

      {ingestionFiles.map((fileObj, index) => (
        <div
          key={fileObj.id}
          className="border p-4 rounded mb-4 bg-gray-100 flex items-center justify-center h-32"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            handleFileUpload(index, file);
          }}
        >
          {fileObj.file ? (
            <p className="text-green-700 font-semibold">{fileObj.file.name} uploaded</p>
          ) : (
            <p className="text-gray-500">Drag & Drop CSV or JSON file here</p>
          )}
        </div>
      ))}

      {ingestionFiles.length > 0 && (
        <button
          onClick={handleIngest}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Ingest Data
        </button>
      )}
    </div>
  );
}
