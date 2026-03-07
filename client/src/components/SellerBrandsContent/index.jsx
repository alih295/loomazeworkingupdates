import React, { useState } from "react";
import { Trash } from "lucide-react";
import axios from "axios";

function SellerBrandsContent(user, settings, setSettings) {
  const [brandIcons, setBrandIcons] = useState(null);

  const addBrandIcons = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("icons", brandIcons);
    console.log(settings, user);

    axios
      .post(
        `${import.meta.env.VITE_HOST}/seller/content/brand-icons/${user?.settings?.sellerID}`,
        formData,
      )
      .then((res) => {
        const { status, data } = res;
        if (status === 202) {
          console.log(data.data);

          window.toastify(data.message, "success");
        }
      });
  };

  return (
    <div className="w-full mt-10 p-5 border border-gray-400">
      <div className="w-full h-full   flex items-center justify-between">
        <input
          onChange={(e) => setBrandIcons(e.target.files[0])}
          class="w-full lg:w-1/2 text-sm !p-2.5 bg-white border border-gray-300 cursor-pointer !rounded-none"
          type="file"
          name=""
          id=""
        />
        <button
          onClick={addBrandIcons}
          class="w-fit px-4 py-2 text-xs bg-[var(--primary)] text-white rounded-md mt-4 transition-all duration-200 ease-out hover:opacity-70"
        >
          Upload Brands Image
        </button>
      </div>

      <div
        className="w-full bg-white mt-5 p-5
        "
      >
        <h1>Brands Content</h1>
        <div className="lg:w-1/2 w-full grid py-5 items-center gap-5  grid-cols-[1fr_20%] ">
          <div className="w-full h-10 flex  ">
            <img
              className="w-full h-full object-contain items-center justify-start"
              src="https://imgs.search.brave.com/YH-a5d7V9FTAdYK4PmzMejI5c1CVWLn5fCmi4kCGIDQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNi8w/Ny9SZWRkaXQtUE5H/LUZpbGUucG5n"
              alt=""
            />
          </div>
          <div className="w-full ">
            <Trash />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerBrandsContent;
