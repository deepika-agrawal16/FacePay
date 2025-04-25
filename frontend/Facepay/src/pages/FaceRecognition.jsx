import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';

const FaceRecognition = () => {
  const videoRef = useRef();
  const [matched, setMatched] = useState(null); // null (idle), true (matched), false (not matched)
  const Navigate = useNavigate();

  const savedImageUrl = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).profileImage
    : 'https://example.com/saved-image.jpg'; // Replace with your fallback image

  // Load face-api.js models from public/models folder
  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  };

  // Start webcam stream
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Camera error:', err));
  };

  // Compare face from webcam with saved image
  const compareFaces = async () => {
    const savedImg = await faceapi.fetchImage(savedImageUrl);

    const savedDetection = await faceapi
      .detectSingleFace(savedImg, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    const liveDetection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (savedDetection && liveDetection) {
      const distance = faceapi.euclideanDistance(
        savedDetection.descriptor,
        liveDetection.descriptor
      );

      console.log('Distance:', distance);
      setMatched(distance < 0.5); // true if match, false otherwise

     setTimeout(() => {
        if (distance < 0.5) {
          Navigate('/dashboard'); // Redirect to dashboard on successful match
        }
      }, 2000); 

      


    } else {
      setMatched(false); // Face not detected or not matched
    }
  };

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="320"
        height="240"
        className="rounded shadow-md"
      />

      <button
        onClick={compareFaces}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
      >
        Compare Faces
      </button>

      <div className="mt-4 text-lg">
        {matched === null ? (
          <span className="text-gray-500">Waiting for comparison...</span>
        ) : matched ? (
          <span className="text-green-600 font-bold">Payment Successful </span>
        ) : (
          <span className="text-red-600 font-bold">Face Not Matched , Try Again </span>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
