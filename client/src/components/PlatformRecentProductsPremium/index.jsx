import React, { useEffect, useState } from "react";
import ProductBoxJewellery from "../ProductBoxJewellery";
import axios from "axios";
import ProductBoxPremium from "../ProductBoxPremium";

export default function PlatformRecentProductsPremium({
  storeSettings,
  isCustomDomain,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storeSettings) {
      fetchRecentProducts();
    }
  }, [storeSettings]);

  const fetchRecentProducts = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_HOST}/platform/home/fetch-recent-products?sellerID=${storeSettings?.sellerID}`,
      )
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setProducts(data?.products);
        }
      })
      .catch((err) => console.error("Frontend GET error", err.message))
      .finally(() => setLoading(false));
  };

  return (
    <section className="relative main-container min-h-[650px] px-4 pt-8 pb-20">
      <div className="mb-10">
        <h1 className="text-2xl text-gray-900 text-center mb-2 font-bold">
          Lastest Products
        </h1>
      </div>

      <div className="grid gap-3 lg:gap-6 
  grid-cols-[repeat(auto-fit,minmax(150px,1fr))] 
  sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {loading ? (
          <p>Loading...</p>
        ) : !loading && products.length > 0 ? (
          products.map((item, idx) => (
            <ProductBoxPremium
              key={idx}
              item={item}
              idx={idx}
              settings={storeSettings}
              isCustomDomain={isCustomDomain}
            />
          ))
        ) : (
          <p className="text-red-500">No latest product found!</p>
        )}
      </div>
      <a
        href={
          isCustomDomain
            ? "/products"
            : `/brand/${storeSettings.brandSlug}/pages/products`
        }
        target="_blank"
        className="block relative overflow-hidden  mt-10 rounded-lg h-10 group border transition-colors duration-300 hover:bg-black border-black font-semibold  lg:w-60 mx-auto  "
      >
        <span className=" w-full -group-hover:top-10 absolute left-0 h-full flex items-center justify-center transition-all duration-75  bg-transparent  font-semibold  text-black text-center ">
          Shop All
        </span>
        <span className=" w-full h-full flex bg-transparent  items-center justify-center  absolute left-0 top-10 transition-all  duration-300 ease-in-out group-hover:top-0 font-semibold  text-white text-center ">
          Shop All
        </span>
      </a>
    </section>
  );
}
