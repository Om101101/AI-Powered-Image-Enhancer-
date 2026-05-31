import React, { useRef, useState, useCallback } from "react";
import Loading from "./Loading";

function CompareSlider({ original, enhanced }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const move = useCallback((clientX) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
    setPos(pct);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full min-h-[240px] flex items-center overflow-hidden cursor-col-resize select-none"
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) move(e.clientX);
      }}
      onMouseUp={() => {
        dragging.current = false;
      }}
      onMouseLeave={() => {
        dragging.current = false;
      }}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => {
        e.preventDefault();
        move(e.touches[0].clientX);
      }}
    >
      {/* Base image */}
      <img
        src={original}
        alt="Original"
        className="absolute inset-0 w-full h-full object-contain max-h-[340px]"
      />

      {/* Enhanced overlay */}
      <img
        src={enhanced}
        alt="Enhanced"
        className="absolute inset-0 w-full h-full object-contain max-h-[340px]"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/60 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center gap-0.5 shadow-lg cursor-col-resize text-[#111]"
        style={{ left: `${pos}%` }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/55 text-white/85 backdrop-blur-sm pointer-events-none">
        Before
      </span>
      <span className="absolute bottom-3 right-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/55 text-white/85 backdrop-blur-sm pointer-events-none">
        After
      </span>
    </div>
  );
}

function ImagePreview({ loading, uploadedImage, enhancedImage }) {
  const handleDownload = () => {
    if (!enhancedImage) return;
    const a = document.createElement("a");
    a.href = enhancedImage;
    a.download = "enhanced.png";
    a.click();
  };

  const showCompare = uploadedImage && enhancedImage && !loading;

  return (
    <div className="flex flex-col gap-4">
      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original */}
        <div className="bg-[#111114] border border-white/[0.07] rounded-2xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-[#18181d]">
            <span className="w-2 h-2 rounded-full bg-[#55555f]" />
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#8a8a92]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Original
            </span>
          </div>
          <div className="flex-1 min-h-[200px] flex items-center justify-center overflow-hidden">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Original"
                className="w-full h-full object-contain max-h-[300px]"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-[#55555f] text-[13px] p-8 text-center">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>No image selected</span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced */}
        <div className="bg-[#111114] border border-white/[0.07] rounded-2xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-[#18181d]">
            <span
              className={`w-2 h-2 rounded-full transition-all ${enhancedImage && !loading ? "bg-[#c8f04a] shadow-[0_0_6px_#c8f04a]" : "bg-[#55555f]"}`}
            />
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#8a8a92]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Enhanced
            </span>
            {enhancedImage && !loading && (
              <button
                onClick={handleDownload}
                className="ml-auto flex items-center gap-1.5 text-[12px] font-medium text-[#c8f04a] bg-[#c8f04a]/10 border border-[#c8f04a]/25 px-3 py-1 rounded-full hover:bg-[#c8f04a]/20 transition-colors"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
            )}
          </div>
          <div className="flex-1 min-h-[200px] flex items-center justify-center overflow-hidden">
            {loading ? (
              <Loading />
            ) : enhancedImage ? (
              <img
                src={enhancedImage}
                alt="Enhanced"
                className="w-full h-full object-contain max-h-[300px]"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-[#55555f] text-[13px] p-8 text-center">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>
                  {uploadedImage ? "Processing…" : "Upload to enhance"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compare slider */}
      {showCompare && (
        <div className="bg-[#111114] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-[#18181d]">
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#8a8a92]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Before / After
            </span>
            <span className="text-[12px] text-[#55555f]">Drag to compare</span>
          </div>
          <CompareSlider original={uploadedImage} enhanced={enhancedImage} />
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
