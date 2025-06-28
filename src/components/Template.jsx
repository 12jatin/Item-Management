import React, { useState } from 'react';
import { FileText, Eye } from 'lucide-react';

export default function TemplatesSection() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { 
      id: 1, 
      name: 'Modern Professional',  
      color: 'bg-blue-100', 
      preview: 'A clean, modern design perfect for tech and corporate roles'
    },
    { 
      id: 2, 
      name: 'Creative Designer', 
      color: 'bg-purple-100', 
      preview: 'Bold and creative layout ideal for design professionals'
    },
    { 
      id: 3, 
      name: 'Executive Classic', 
      color: 'bg-gray-100', 
      preview: 'Traditional format suitable for senior executive positions'
    },
    { 
      id: 4, 
      name: 'Minimalist Clean', 
      color: 'bg-green-100', 
      preview: 'Simple and elegant design that focuses on content'
    },
    { 
      id: 5, 
      name: 'Academic Scholar', 
      color: 'bg-indigo-100', 
      preview: 'Structured layout perfect for academic and research roles'
    },
    { 
      id: 6, 
      name: 'Startup Friendly', 
      color: 'bg-orange-100', 
      preview: 'Dynamic design suitable for startup and entrepreneurial roles'
    }
  ];

  return (
    <div className="p-8 bg-white h-full mt-6"> {/* Removed w-1/2, mt-8, and -y-auto */}
      <div className="w-full h-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Choose a Template</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template.id
                  ? 'border-sky-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className={`w-full h-48 ${template.color} rounded-lg mb-4 flex items-center justify-center`}>
                <FileText className="w-16 h-16 text-gray-600" />
              </div>

              <h3 className="font-bold text-lg text-gray-800 mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{template.preview}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Use Template
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}