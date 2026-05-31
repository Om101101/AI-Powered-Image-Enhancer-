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

  const onMouseDown = (e) => {
    dragging.current = true;
    move(e.clientX);
  };
  const onMouseMove = (e) => {
    if (dragging.current) move(e.clientX);
  };
  const onMouseUp = () => {
    dragging.current = false;
  };
  const onTouchMove = (e) => {
    e.preventDefault();
    move(e.touches[0].clientX);
  };

  return (
    <div
      className="compare-wrap"
      ref={wrapRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={onTouchMove}
    >
      <img src={original} alt="Original" className="compare-img compare-base" />
      <img
        src={enhanced}
        alt="Enhanced"
        className="compare-img compare-overlay"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />
      <div className="compare-divider" style={{ left: `${pos}%` }}>
        <div className="compare-handle">
          <svg
            width="14"
            height="14"
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
            width="14"
            height="14"
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
      </div>
      <span className="compare-label-left">Before</span>
      <span className="compare-label-right">After</span>
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
    <div className="preview-section">
      {/* Side-by-side grid */}
      <div className="preview-grid">
        {/* Original */}
        <div className="preview-card">
          <div className="card-header">
            <div className="card-label">
              <span className="label-dot dot-neutral" />
              Original
            </div>
          </div>
          <div className="card-body">
            {uploadedImage ? (
              <img src={uploadedImage} alt="Original" className="preview-img" />
            ) : (
              <div className="empty-state">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
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
        <div className="preview-card">
          <div className="card-header">
            <div className="card-label">
              <span
                className={`label-dot ${enhancedImage && !loading ? "dot-active" : "dot-neutral"}`}
              />
              Enhanced
            </div>
            {enhancedImage && !loading && (
              <button className="download-btn" onClick={handleDownload}>
                <svg
                  width="14"
                  height="14"
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
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : enhancedImage ? (
              <img src={enhancedImage} alt="Enhanced" className="preview-img" />
            ) : (
              <div className="empty-state">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
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

      {/* Compare Slider */}
      {showCompare && (
        <div className="compare-section">
          <div className="compare-header">
            <span className="compare-title">Before / After</span>
            <span className="compare-hint">Drag to compare</span>
          </div>
          <CompareSlider original={uploadedImage} enhanced={enhancedImage} />
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
