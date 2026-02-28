
import React, { useState } from "react";
import ButtonLoader from "../ButtonLoader";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function SellerShowStripperContentUpdate({ user, settings , setSettings }) {
  const [offerTxt1, setOfferTxt1] = useState( "",
  );
  const [offerTxt2, setOfferTxt2] = useState( "",
  );
  const [offerTxt3, setOfferTxt3] = useState( "",
  );
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
const [stripperData, setStripperData] = useState(settings?.content?.stripper || []);
const [deleting, setDeleting] = useState(null);



console.log(`stripper data in component:`, settings?.content)
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type))
      return window.toastify(
        "Please select a valid image type (PNG, JPEG, WEBP)",
        "warning",
      );
    if (file.size > 5 * 1024 * 1024)
      return window.toastify("Please select image within 5MB size", "warning");
    

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddStripperData = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("offerText1", offerTxt1.trim());
    formdata.append("offerText2", offerTxt2.trim());
    formdata.append("offerText3", offerTxt3.trim());
    formdata.append("image", image);

    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_HOST}/seller/content/stripper-text/add/${user._id}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      )
      .then((res) => {
        const { status, data } = res;
        if (status === 202) {
          window.toastify(data.message, "success");
            
        }
        setStripperData([...stripperData, data.stripper]);
        console.log(`stripper data after update:`, data)
      })
      .catch((err) => {
        window.toastify(
          err.response?.data?.message || "Something went wrong",
          "error",
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 border border-gray-200 mt-8">
      <h1>Stripper Details</h1>
      <div className="w-1/2 p-4 mt-4 bg-white">
        <form
          className="w-full bg-white flex flex-col items-start justify-center gap-5"
          action=""
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-3 text-sm font-bold text-gray-900">
                Offer Text 1{" "}
                <span className="text-xs text-gray-700">(Optional)</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={offerTxt1}
                placeholder="Type main heading to display"
                className="w-full text-sm !p-2.5 bg-white border border-gray-300 !rounded-none"
                onChange={(e) => setOfferTxt1(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-3 text-sm font-bold text-gray-900">
                Offer Text 2{" "}
                <span className="text-xs text-gray-700">(Optional)</span>
              </label>
              <input
                type="text"
                name="subtitle"
                id="subtitle"
                value={offerTxt2}
                placeholder="Type subtitle to display"
                className="w-full text-sm !p-2.5 bg-white border border-gray-300 !rounded-none"
                onChange={(e) => setOfferTxt2(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-3 text-sm font-bold text-gray-900">
                Offer Text 3{" "}
                <span className="text-xs text-gray-700">(Optional)</span>
              </label>
              <input
                type="text"
                name="cta"
                id="cta"
                value={offerTxt3}
                placeholder="Paste link where you want to redirect"
                className="w-full text-sm !p-2.5 bg-white border border-gray-300 !rounded-none"
                onChange={(e) => setOfferTxt3(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-3 text-sm font-bold text-gray-900">
                Image *{" "}
                <span className="text-xs font-normal">
                  (Recommended size: 1500 x 653)
                </span>
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="w-full text-sm !p-2.5 bg-white border border-gray-300 cursor-pointer !rounded-none"
                onChange={handleImageChange}
              />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-[50px] h-[50px] object-contain rounded-md shadow-sm"
                  />
                </div>
              )}
            </div>

            <button
              className="w-fit px-4 py-2 text-xs bg-[var(--primary)] text-white rounded-md mt-4 transition-all duration-200 ease-out hover:opacity-70"
              disabled={loading}
              onClick={handleAddStripperData}
            >
              {!loading ? "Add Stripper Text" : <ButtonLoader />}
            </button>
          </div>
        </form>
      </div>

      {/* adding table to show the data of stripper  */}

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="text-xs text-[var(--secondary)] bg-[var(--secondary)]/10">
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 text-left">
                #
              </th>
              <th className="px-4 py-2 border-b border-gray-200">Image</th>
              <th className="px-4 py-2 border-b border-gray-200">Title</th>
              <th className="px-4 py-2 border-b border-gray-200">Subtitle</th>
              <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                CTA Link
              </th>
              <th className="px-4 py-2 border-b border-gray-200 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {stripperData.length > 0 ? (
              stripperData.map((slide, index) => (
                <tr key={index} className="text-xs">
                  <td className="px-4 py-2 border-b border-gray-200 text-left">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-center">
                   
                      <img
                        src={`${slide.imageUrl}`} // Cache buster
                        alt={"slide" + index}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "contain",
                          margin: "0 auto",
                        }}
                      />
                
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-gray-700 text-center">
                     <p>{slide.offerTxt1}</p> 
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-gray-700 text-center">
                     <p>{slide.offerTxt2}</p>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-blue-600 underline text-center">
                    {slide.offerTxt3}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-center">
                    <div className="flex justify-end">
                      {deleting === index ? (
                        <div className="w-6 h-6 border-t border-[var(--primary)] rounded-full animate-spin"></div>
                      ) : (
                        <Trash2
                          size={16}
                          className="text-red-500 cursor-pointer hover:opacity-80"
                          onClick={() => handleDeleteSlide(index)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No slides added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
