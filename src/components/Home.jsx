import React, { useState } from "react";
import ImageUpload from "./ImageUplode";
import ImagePreview from "./ImagePreview";

function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const ImageUplodeHandler = (file) => {
    
    setUploadedImage(URL.createObjectURL(file));

     // Simulate image processing
    setLoading(true);
    //   setEnhancedImage(URL.createObjectURL(file)); // In real case, this would be the processed image URL
    //   setLoading(false);
    // }, 2000);
  };

  return (
    <>
      <ImageUpload ImageUplodeHandler={ImageUplodeHandler} />

      <ImagePreview
        loading={loading}
        uploadedImage={uploadedImage}
        enhancedImage={enhancedImage}
      />
    </>
  );
}

export default Home;
