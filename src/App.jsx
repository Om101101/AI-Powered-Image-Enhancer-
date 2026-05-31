import React from "react";
import Home from "./components/Home";
function App() {
  return (
    <div className="Flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI-Powered Image Enhancer
        </h1>
        <p className="text-lg text-gray-600">
          Upload your images and let our AI enhance them for you!
        </p>
      </div>
      <Home />
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>© 2026 AI-Powered Image Enhancer. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
