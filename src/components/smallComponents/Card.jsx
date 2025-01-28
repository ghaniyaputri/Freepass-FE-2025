import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  const { id, title, price, description, image } = product;

  return (
    <div className="card bg-base-100 max-w-md shadow-xl">
      <figure>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-orange-500">{title}</h2>
        <p className="text-sm text-black">{description.substring(0, 100)}...</p>
        <p className="text-lg font-bold text-orange-500">${price}</p>
        <div className="card-actions justify-end text-orange-400">
          {/* Link to the product details page */}
          <Link to={`/product/${id}`} className="bg-orange-500 hover:bg-white text-white hover:text-orange-700 px-4 py-2 border-0 rounded-none hover:underline hover:border-b-2 hover:border-orange-300">
          Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
