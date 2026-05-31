import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 w-full">
      {/* Triple ring orb */}
      <div className="relative w-14 h-14 flex items-center justify-center mb-1">
        <div
          className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-[#c8f04a] animate-spin"
          style={{ animationDuration: "1.2s" }}
        />
        <div
          className="absolute inset-[6px] rounded-full border-[1.5px] border-transparent border-r-[#c8f04a]/50 animate-spin"
          style={{ animationDuration: "1.8s", animationDirection: "reverse" }}
        />
        <div
          className="absolute inset-[12px] rounded-full border-[1.5px] border-transparent border-b-[#c8f04a]/25 animate-spin"
          style={{ animationDuration: "2.5s" }}
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c8f04a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>

      <p
        className="text-[15px] font-semibold text-[#f0f0ee]"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Enhancing
      </p>
      <p className="text-[12px] text-[#55555f] text-center">
        AI is sharpening details &amp; colors
      </p>

      {/* Progress bar */}
      <div className="w-36 h-0.5 bg-[#222228] rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-[#c8f04a] rounded-full"
          style={{
            animation: "pixlify-progress 2s ease-in-out infinite alternate",
          }}
        />
      </div>

      <style>{`
        @keyframes pixlify-progress {
          from { width: 20%; margin-left: 0; }
          to   { width: 45%; margin-left: 55%; }
        }
      `}</style>
    </div>
  );
}

export default Loading;
