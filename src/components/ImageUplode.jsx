import React from "react";

function ImageUplode(props) {
  const ShowImageHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      props.ImageUplodeHandler(file);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
      <label
        htmlFor="file-upload"
        className="block w-full cursor-pointer border-2 border-dashed border-blue-500 rounded-lg p-8 text-center hover:border-blue-700 transition-all duration-300"
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={ShowImageHandler}
        />

        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl">📸</span>

          <span className="text-lg font-semibold text-gray-700">
            Click to Upload Image
          </span>

          <p className="text-sm text-gray-500">
            JPG, PNG, WEBP files supported
          </p>
        </div>
      </label>
    </div>
  );
}

export default ImageUplode;