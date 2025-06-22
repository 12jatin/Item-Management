import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ViewItems = ({ items, onTabChange }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNavigation = (tab) => {
    onTabChange(tab);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem && currentImageIndex < selectedItem.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleEnquire = (item) => {
    // Option 1: Show alert with item details (always works)
    alert(`Enquiry for: ${item.name}\nType: ${item.type}\n\nContact us at: your-email@example.com\nOr call: +91-XXXXXXXXXX`);
    
    // Option 2: Try to open email client (uncomment to use)
    // try {
    //   const subject = `Enquiry about ${item.name}`;
    //   const body = `Hi, I'm interested in learning more about ${item.name} (${item.type}). Please provide more details.`;
    //   window.location.href = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // } catch (error) {
    //   alert('Could not open email client. Please contact us at: your-email@example.com');
    // }
    
    // Option 3: Open WhatsApp (uncomment and add your phone number to use)
    // const message = `Hi, I'm interested in ${item.name} (${item.type}). Please provide more details.`;
    // window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    
    // Option 4: Copy contact info to clipboard (uncomment to use)
    // const contactInfo = `Enquiry for: ${item.name}\nContact: your-email@example.com`;
    // navigator.clipboard.writeText(contactInfo).then(() => {
    //   alert('Contact information copied to clipboard!');
    // }).catch(() => {
    //   alert('Contact us at: your-email@example.com');
    // });
    
    closeModal();
  };

  return (
    <div className="m-0 p-0">
      {/* Navbar */}
      <Navbar activeTab="view" onTabChange={handleNavigation} />
      
      {/* Items Grid */}
      <div className="container mx-auto px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found. Add some items to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openModal(item)}
              >
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={item.images[0]} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{selectedItem.name}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Image Carousel */}
            <div className="relative">
              <div className="h-80 bg-gray-100 flex items-center justify-center">
                <img 
                  src={selectedItem.images[currentImageIndex]} 
                  alt={`${selectedItem.name} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Arrows */}
              {selectedItem.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
                    disabled={currentImageIndex === 0}
                  >
                    &#8249;
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
                    disabled={currentImageIndex === selectedItem.images.length - 1}
                  >
                    &#8250;
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                {currentImageIndex + 1} / {selectedItem.images.length}
              </div>
            </div>

            {/* Dots Indicator */}
            {selectedItem.images.length > 1 && (
              <div className="flex justify-center py-3 space-x-2">
                {selectedItem.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Item Details */}
            <div className="p-6">
              <div className="mb-4">
                <span className="text-lg font-semibold text-gray-700">Type: </span>
                <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium ml-2">
                  {selectedItem.type}
                </span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Description:</h4>
                <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-lg font-semibold text-gray-700">Added: </span>
                <span className="text-gray-600">{selectedItem.added}</span>
              </div>

              {/* Enquire Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleEnquire(selectedItem)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
                >
                  📧 Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewItems;