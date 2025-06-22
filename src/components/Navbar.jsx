import React from 'react';

const Navbar = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 shadow-lg w-full m-0 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        
        <h1 className="text-white text-2xl font-bold">
          Item Management System
        </h1>
        
       
        <div className="flex space-x-4">
          <button
            onClick={() => onTabChange('view')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'view'
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-blue-400 text-white hover:bg-blue-300'
            }`}
          >
            View Items
          </button>
          
          <button
            onClick={() => onTabChange('add')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'add'
                ? 'bg-white text-purple-600 shadow-md'
                : 'bg-purple-400 text-white hover:bg-purple-300'
            }`}
          >
            Add Item
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;