import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './Components/Home';
import Products from './Components/Products';
import Product from './Components/Product';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;

