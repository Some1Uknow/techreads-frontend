import { useEffect, useRef } from "react";

const Popup = ({ closePopup }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full">
        <button
          className="absolute top-2 text-xl font-bold right-2 text-gray-200 hover:text-gray-900"
          onClick={closePopup}
        >
          &times;
        </button>
        <div className="p-4 bg-zinc-600">
          <h2 className="text-xl font-bold mb-4 text-white">
            TechReads Tutorial
          </h2>
          <video
            ref={videoRef}
            className="w-full rounded"
            src="/techreads_tutorial.mp4"
            autoPlay
            loop
            muted
            playsInline
            onContextMenu={(e) => e.preventDefault()}
            style={{ pointerEvents: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
