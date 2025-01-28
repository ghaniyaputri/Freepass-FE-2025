import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../Layout";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await fetch("https://fakestoreapi.com/carts/1");
        const productResponse = await fetch("https://fakestoreapi.com/products");

        if (!cartResponse.ok || !productResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const cartData = await cartResponse.json();
        const productData = await productResponse.json();

        setCart(cartData);
        setProducts(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cart && products.length > 0) {
      const totalPrice = cart.products.reduce((acc, cartProduct) => {
        const productDetails = products.find(product => product.id === cartProduct.productId);
        return acc + (productDetails.price * cartProduct.quantity);
      }, 0);
      setTotal(totalPrice);
    }
  }, [cart, products]);

  const handleQuantityChange = (productId, delta) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.map((product) =>
        product.productId === productId
          ? { ...product, quantity: Math.max(product.quantity + delta, 0) }
          : product
      ),
    }));
  };

  const handleSave = () => {
    navigate('/payment', { state: { total } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-screen-lg min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-orange-500 text-center">Your Cart</h1>
        <div className="grid gap-6">
          {cart.products.map((cartProduct) => {
            const productDetails = products.find((product) => product.id === cartProduct.productId);
            const subTotal = productDetails.price * cartProduct.quantity;

            return (
              <div key={cartProduct.productId} className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
              <figure className="w-full md:w-1/3 h-48 md:h-auto">
                <img
                  src={productDetails.image}
                  alt={productDetails.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="p-4 w-full md:w-2/3 flex flex-col justify-between">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-orange-500">
                  {productDetails.title || "Product"}
                </h2>
                <p className="text-m md:text-base lg:text-lg text-gray-700">
                  Price: <span className="font-bold">${productDetails.price || 0}</span>
                </p>
                <p className="text-m md:text-base lg:text-lg text-gray-700">
                  Sub Total: <span className="font-bold">${subTotal.toFixed(2)}</span>
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <button
                    className="btn btn-outline btn-sm text-sm md:text-base"
                    onClick={() => handleQuantityChange(cartProduct.productId, -1)}
                  >
            
                    </button>
                    <span className="font-bold">{cartProduct.quantity}</span>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleQuantityChange(cartProduct.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-xl font-bold text-orange-500">Total: ${total.toFixed(2)}</p>
          <button className="btn w-full md:w-auto mt-4 md:mt-0 bg-orange-500" onClick={handleSave}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;