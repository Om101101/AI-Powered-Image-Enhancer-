import React from "react";

function ImagePreview(props) {
  return (
    <div className="mt-8 grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {/* Original Image */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Origanl Image
        </h2>
        {props.uploadedImage ? (
          <img
            src={props.uploadedImage}
            alt="Original"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-80 bg-amber-200">
            No image Selected
          </div>
        )}
      </div>
      {/* Processed Image */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Enhanced Image
        </h2>

        {props.enhancedImage ? (
          <img
            src={props.enhancedImage}
            alt="Enhanced"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-80 bg-amber-200">
            No enhanced image available
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePreview;
