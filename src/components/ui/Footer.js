import React from "react";

const FooterUI = ({ leftText, rightText }) => {
  return (
    <footer className="border-t bg-white px-6 py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">
            {leftText}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">System Status:</span>
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Operational
          </span>
          <span className="hidden sm:inline text-gray-400">|</span>
          <span>{rightText}</span>
        </div>

      </div>
    </footer>
  );
};

export default FooterUI;