import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlatformCategoriesPremium({
  settings,
  isCustomDomain,
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (settings) fetchPlatformHomeCategories();
  }, [settings]);
  const CategoryCard = ({ cat, className = "" }) => (
    <a
      href={
        isCustomDomain
          ? `/products/${cat.name}`
          : `/brand/${settings?.brandSlug}/products/${cat.name}`
      }
      target="_blank"
      rel="noopener noreferrer"
      className={`block h-full group `}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src={cat.imageURL}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-120"
        />

        {settings.layout.showCategoriesText && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white/50 capitalize group-hover:bg-black group-hover:text-white backdrop-blur-md px-6 py-2 rounded-lg font-semibold text-gray-800">
              {cat.name}
            </span>
          </div>
        )}
      </div>
    </a>
  );
  const fetchPlatformHomeCategories = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_HOST}/platform/home/fetch-categories?sellerID=${settings?.sellerID}`,
      )
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data?.categories);
        }
      })
      .catch((err) => console.error("Frontend GET error", err.message))
      .finally(() => setLoading(false));
  };
  return (
    <section className="section-categories py-10 sm:py-14">
      <div className="main-container mx-auto px-4 relative">
        <div className="flex justify-center text-center items-center mb-8 sm:mb-10 md:mb-15 gap-4">
          <h2 className="head  text-[var(--text)] font-bold text-xl sm:text-2xl md:text-3xl">
            Shop by Category
          </h2>
        </div>

        {!loading && categories.length === 0 && (
          <p className="text-red-500">No category found!</p>
        )}

        {!loading && categories.length > 6 ? (
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:grid-rows-2 lg:h-[600px]">

  <CategoryCard cat={categories[0]} />

  <div className="lg:row-span-2">
    <CategoryCard cat={categories[1]} />
  </div>

  <CategoryCard cat={categories[2]} />
  <CategoryCard cat={categories[3]} />
  <CategoryCard cat={categories[4]} />

  <div className="lg:col-span-2">
    <CategoryCard cat={categories[5]} />
  </div>

</div>
        ) : (
          " "
        )}
      </div>
    </section>
  );
}
