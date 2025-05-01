import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const [matched, setMatched] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { receiverPhoneNumber, amount } = location.state || {};

  const savedImageUrl = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).profileImage
    : '';

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    setLoading(false);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Camera error:', err));
  };

  const createTransaction = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/auth/transactions/create',
        { receiverPhoneNumber, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Transaction creation failed:', err);
    }
  };

  const compareFaces = async () => {
    setMatched(null);

    try {
      const savedImg = await faceapi.fetchImage(savedImageUrl);
      const savedDetection = await faceapi
        .detectSingleFace(savedImg, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      const liveDetection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!savedDetection || !liveDetection) {
        setMatched(false);
        return;
      }

      const distance = faceapi.euclideanDistance(savedDetection.descriptor, liveDetection.descriptor);
      const isMatch = distance < 0.4;

      setMatched(isMatch);

      if (isMatch) {
        await createTransaction();
        setShowSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      console.error('Face comparison error:', err);
      setMatched(false);
    }
  };

  useEffect(() => {
    loadModels().then(startVideo);

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Face Verification</h2>

      {loading ? (
        <p>Loading models...</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            width="320"
            height="240"
            className="rounded shadow-md border"
          />

          <button
            onClick={compareFaces}
            disabled={matched !== null}
            className={`mt-4 px-6 py-2 ${
              matched === null ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'
            } text-white rounded shadow`}
          >
            {matched === null ? 'Verify Face' : matched ? 'Verified!' : 'Try Again'}
          </button>

          <div className="mt-4 text-lg">
            {matched === null ? (
              <span className="text-gray-500">Please position your face in the frame</span>
            ) : matched ? (
              <span className="text-green-600 font-bold animate-pulse">
                Payment Successful! Redirecting...
              </span>
            ) : (
              <span className="text-red-600 font-bold">Verification Failed</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FaceRecognition;
