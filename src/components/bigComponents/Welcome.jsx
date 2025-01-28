import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import Layout from "../Layout";

const WelcomePage = () => {
  const [products, setProducts] = useState([]);
  const [counter, setCounter] = useState(60); 
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 5))) 
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => Math.max(prevCounter - 1, 0)); 
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-16 sm:py-24 lg:py-56">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-orange-500 sm:text-4xl md:text-5xl lg:text-6xl">
            We are world’s potential market
          </h1>
          <p className="mb-8 text-base font-normal text-orange-400 sm:text-lg lg:text-xl sm:px-8 lg:px-24">
            Here at MyStore we focus on markets where technology, innovation, and capital can unlock
            long-term value and drive economic growth.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#product"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300"
            >
              Get started
              <svg
                className="w-4 h-4 ml-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:text-orange-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="container mx-auto p-4 text-orange-500">
        <h2 id="product" className="text-2xl font-bold text-center mb-8">
          Featured Products
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
  <SwiperSlide key={product.id}>
    <div className="card bg-base-100 max-h-max min-h-[350px] m-4 shadow-xl">  {/* Tinggi card lebih besar */}
      <figure>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl h-16 line-clamp-2 text-orange-500"> {/* Menambah tinggi untuk judul */}
          {product.title}
        </h2>
        <p className="text-xs text-gray-500">{product.description.substring(0, 50)}...</p>
        <p className="text-lg font-bold text-orange-500">${product.price}</p>
      </div>
    </div>
  </SwiperSlide>
))}
        </Swiper>
      </div>

      {/* Flash Sale */}
      <div className="flex flex-col items-center justify-center mt-8 px-4 text-orange-500">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">Flash sale in</h1>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-4">
          {["days", "hours", "min", "sec"].map((unit, index) => (
            <div
              key={unit}
              className="flex flex-col items-center p-2 bg-orange-500 rounded-md text-white"
            >
              <span className="countdown font-mono text-3xl sm:text-5xl">
                <span style={{ "--value": index === 3 ? counter : 5 * (3 - index) }}></span>
              </span>
              <span className="text-sm">{unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col items-center justify-center mt-8 px-4">
         <div className="stats shadow w-full sm:w-3/4 md:w-1/2">
          <div className="stat">
            <div className="stat-title text-orange-600">Downloads</div>
            <div className="stat-value text-orange-600">31K</div>
            <div className="stat-desc text-orange-600">Jan 1st - Feb 1st</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current text-orange-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-orange-600">New Users</div>
            <div className="stat-value text-orange-600">4,200</div>
            <div className="stat-desc text-orange-600">↗︎ 400 (22%)</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current text-orange-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-orange-600">New Registers</div>
            <div className="stat-value text-orange-600">1,200</div>
            <div className="stat-desc text-orange-600">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomePage;
