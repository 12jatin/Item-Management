import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle } from 'lucide-react';

export default function UploadSection() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      setSelectedFile(file);
    }
  };

  const handleProceed = () => {
    if (selectedFile) {
      console.log('Proceeding with file:', selectedFile.name);
      // Navigate to edit page with file data
      navigate('/edit', { state: { file: selectedFile } });
    }
  };

  const handleChangeFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = '';
  };

  return (
    <div className="w-1/2 p-8 border-r mt-16 border-gray-200 flex flex-col justify-center items-center bg-gray-50">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload Your Resume</h2>
        
        {/* Upload Area */}
        <div className={`border-2 rounded-lg p-12 text-center bg-white transition-all ${
          selectedFile 
            ? 'border-green-300 bg-green-50' 
            : 'border-gray-300'
        }`}>
          {selectedFile ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <div className="flex items-center justify-center mb-2">
                <FileText className="w-5 h-5 text-gray-600 mr-2" />
                <p className="text-lg font-medium text-gray-800">{selectedFile.name}</p>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={handleProceed}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Proceed
                </button>
                <button 
                  onClick={handleChangeFile}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Change File
                </button>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">Select your resume file</p>
              <button 
                onClick={handleChooseFile}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Choose File
              </button>
            </>
          )}
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="hidden"
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX</p>
          <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
        </div>

        {/* Quick Actions */}
        <div className="mt-44 flex gap-3">
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
            Create New
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Import from LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}