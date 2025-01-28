import { useState, useEffect } from 'react';
import Layout from '../Layout';
import Card from '../smallComponents/Card';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all'); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = ['all', ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === 'all') {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <Layout>
      <div className='p-4 mt-4 flex justify-center '>
        <h1 className='text-3xl font-bold text-orange-500'>Our Products</h1>
      </div>
      <div className="container mx-auto p-5">
        
        {/* Filter Dropdown */}
        <div className="flex justify-start w-1/2 md:w-1/6 mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Store;