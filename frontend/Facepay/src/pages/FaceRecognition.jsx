import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const [matched, setMatched] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const savedImageUrl = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).profileImage
    : '';

  const loadModels = async () => {
    try {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Camera error:', err));
  };

  const completeTransaction = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/auth/transactions/complete',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
    } catch (error) {
      console.error('Error completing transaction:', error);
    }
  };

  const compareFaces = async () => {
    setMatched(null);

    try {
      if (!savedImageUrl) {
        throw new Error('No profile image found');
      }

      const savedImg = await faceapi.fetchImage(savedImageUrl);
      const savedDetection = await faceapi
        .detectSingleFace(savedImg, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!savedDetection) {
        console.warn('No face detected in saved image.');
        setMatched(false);
        return;
      }

      const videoEl = videoRef.current;

      const liveDetection = await faceapi
        .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!liveDetection) {
        console.warn('No face detected in live video.');
        setMatched(false);
        return;
      }

      const distance = faceapi.euclideanDistance(
        savedDetection.descriptor,
        liveDetection.descriptor
      );

      const isMatch = distance < 0.4;
      setMatched(isMatch);

      if (isMatch) {
        await completeTransaction();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during face comparison:', error);
      setMatched(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadModels();
      startVideo();
    };
    init();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Face Verification</h2>

      {loading ? (
        <p className="text-gray-500">Loading models...</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            width="320"
            height="240"
            className="rounded shadow-md border"
            onPlay={() => console.log('Video playing...')}
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
              <span className="text-green-600 font-bold">
                Payment Successful! Redirecting...
              </span>
            ) : (
              <span className="text-red-600 font-bold">
                Verification Failed. Please try again.
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FaceRecognition;
