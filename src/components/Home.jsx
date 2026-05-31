import React, { useState } from "react";
import ImageUpload from "./ImageUplode";
import ImagePreview from "./ImagePreview";
import { enhancedImageAPI } from "../utils/enhanceImageAPI";

function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const ImageUplodeHandler = async (file) => {
    setUploadedImage(URL.createObjectURL(file));
    setEnhancedImage(null);
    setLoading(true);

    try {
      const enhancedURL = await enhancedImageAPI(file);
      setEnhancedImage(enhancedURL);
    } catch (error) {
      console.error("Error enhancing image:", error);
      alert("Failed to enhance image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-mark">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="logo-text">OYJ</span>
          <span className="logo-tag">AI Image Enhancer</span>
        </div>
      </header>

      <main className="app-main">
        {/* Hero */}
        <div className="hero-section">
          <h1 className="hero-title">
            Enhance your images
            <br />
            <span className="hero-accent">with AI precision</span>
          </h1>
          <p className="hero-sub">
            Upload any photo and watch our AI upscale, sharpen, and restore it
            in seconds.
          </p>
        </div>

        <ImageUpload ImageUplodeHandler={ImageUplodeHandler} />
        <ImagePreview
          loading={loading}
          uploadedImage={uploadedImage}
          enhancedImage={enhancedImage}
        />
      </main>

      <footer className="app-footer">
        <span>Powered by AI · Built with React . Developed By Om Jaiswal</span>
      </footer>
    </div>
  );
}

export default Home;
