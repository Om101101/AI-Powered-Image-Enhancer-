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
    <div
      className="min-h-screen flex flex-col bg-[#0a0a0b]"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(200,240,74,0.06) 0%, transparent 70%), #0a0a0b",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] backdrop-blur-xl bg-[#0a0a0b]/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#c8f04a]/10 border border-[#c8f04a]/20 flex items-center justify-center text-[#c8f04a] shrink-0">
            <svg
              width="16"
              height="16"
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
          <span
            className="font-bold text-[17px] text-[#f0f0ee] tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            OJY
          </span>
          <span className="ml-auto text-[11px] text-[#55555f] bg-[#222228] border border-white/[0.07] px-2 py-0.5 rounded-full">
            AI Image Enhancer
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-10 flex flex-col gap-8">
        {/* Hero */}
        <div className="text-center">
          <h1
            className="text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#f0f0ee]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Enhance your images
            <br />
            <span className="text-[#c8f04a]">with AI precision</span>
          </h1>
          <p className="mt-3 text-[#8a8a92] text-[clamp(13px,2.5vw,15px)] max-w-md mx-auto font-light">
            Upload any photo and watch our AI upscale, sharpen, and restore it
            instantly.
          </p>
        </div>

        <ImageUpload ImageUplodeHandler={ImageUplodeHandler} />

        <ImagePreview
          loading={loading}
          uploadedImage={uploadedImage}
          enhancedImage={enhancedImage}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] text-center py-5 text-xs text-[#55555f]">
        Powered by AI · Built with React & Tailwind CSS · Devloped by Om Jaiswal 
      </footer>
    </div>
  );
}

export default Home;
