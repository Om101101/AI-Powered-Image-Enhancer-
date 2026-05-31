import React, { useRef, useState } from "react";

function ImageUpload({ ImageUplodeHandler }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      ImageUplodeHandler(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`
        relative w-full rounded-2xl border-[1.5px] border-dashed cursor-pointer
        flex flex-col items-center gap-3 px-6 py-12 overflow-hidden
        transition-all duration-200
        ${
          dragging
            ? "border-[#c8f04a]/40 bg-[#18181d] -translate-y-px"
            : "border-white/[0.12] bg-[#111114] hover:border-[#c8f04a]/35 hover:bg-[#18181d] hover:-translate-y-px"
        }
      `}
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${dragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(200,240,74,0.07), transparent 70%)",
        }}
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* Icon ring */}
      <div
        className={`
        w-14 h-14 rounded-full border flex items-center justify-center mb-1
        transition-all duration-200
        ${
          dragging
            ? "border-[#c8f04a]/40 text-[#c8f04a] bg-[#222228]"
            : "border-white/[0.12] text-[#8a8a92] bg-[#222228] hover:border-[#c8f04a]/40 hover:text-[#c8f04a]"
        }
      `}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <p
        className="text-[17px] font-semibold text-[#f0f0ee]"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Drop your image here
      </p>
      <p className="text-[13px] text-[#55555f]">or click to browse</p>

      {/* Format pills */}
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
        {["JPG", "PNG", "WEBP", "Up to 20MB"].map((f) => (
          <span
            key={f}
            className="text-[11px] font-medium text-[#55555f] bg-[#222228] border border-white/[0.07] px-3 py-0.5 rounded-full tracking-wide"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
