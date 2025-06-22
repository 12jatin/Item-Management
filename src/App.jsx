import { useState } from 'react'
import ViewItems from './pages/ViewItems';
import AddItem from './pages/AddItems';
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('view');
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Classic Shirt",
      type: "Shirt",
      description: "A classic white cotton shirt perfect for formal and casual occasions. Made with high-quality cotton fabric.",
      added: "1/15/2024",
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Running Sneakers",
      type: "Shoes",
      description: "Comfortable running sneakers with excellent cushioning and support for daily workouts.",
      added: "1/12/2024",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      name: "Denim Jeans",
      type: "Pant",
      description: "Premium denim jeans with a comfortable fit and durable construction.",
      added: "1/10/2024",
      images: [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 4,
      name: "Polyester Jacket",
      type: "jackets",
      description: "Roadster Men Solid Windcheater Sporty Jacket by Myntra.",
      added: "1/8/2024",
      images: [
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
      ]
    }
  ]);

  const handleNavigation = (tab) => {
    setCurrentPage(tab);
  };

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
    // Automatically switch to view page after adding item
    setCurrentPage('view');
  };

  return (
    <div className="App">
      {currentPage === 'view' && (
        <ViewItems 
          items={items}
          onTabChange={handleNavigation}
        />
      )}
      {currentPage === 'add' && (
        <AddItem 
          onTabChange={handleNavigation}
          onAddItem={handleAddItem}
        />
      )}
    </div>
  );
}

export default App