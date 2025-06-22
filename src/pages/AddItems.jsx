import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const AddItem = ({ onTabChange, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: null,
    additionalImages: []
  });

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);

  const itemTypes = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Other'];

  const handleNavigation = (tab) => {
    onTabChange(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          coverImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImageFiles(files);
    
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData(prev => ({
        ...prev,
        additionalImages: images
      }));
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.type && formData.description) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        description: formData.description,
        added: new Date().toLocaleDateString(),
        images: formData.coverImage ? [formData.coverImage, ...formData.additionalImages] : []
      };
      
      if (onAddItem) {
        onAddItem(newItem);
      }
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: null,
        additionalImages: []
      });
      setCoverImageFile(null);
      setAdditionalImageFiles([]);
      
      // Reset file inputs
      const coverInput = document.getElementById('coverImage');
      const additionalInput = document.getElementById('additionalImages');
      if (coverInput) coverInput.value = '';
      if (additionalInput) additionalInput.value = '';
      
      alert('Item added successfully! Redirecting to view items...');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="m-0 p-0">
      {/* Navbar */}
      <Navbar activeTab="add" onTabChange={handleNavigation} />
      
      {/* Add Item Form */}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Add New Item</h2>
            <p className="text-gray-600">Fill in the details to add a new item to your inventory</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Item Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select item type</option>
                  {itemTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Item Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter item description"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {formData.coverImage && (
                  <div className="mt-3">
                    <img 
                      src={formData.coverImage} 
                      alt="Cover preview" 
                      className="w-32 h-32 object-cover rounded-lg shadow-md border"
                    />
                  </div>
                )}
              </div>

              {/* Additional Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Images
                </label>
                <input
                  type="file"
                  id="additionalImages"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {formData.additionalImages.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.additionalImages.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`Additional preview ${index + 1}`} 
                        className="w-20 h-20 object-cover rounded-lg shadow-md border"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;