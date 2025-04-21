// ProfileUploader.jsx
import { UploadButton } from "@uploadthing/react";
import { useState } from "react";

const ProfileUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUploadComplete = async (res) => {
    const fileUrl = res[0].url;
    setImageUrl(fileUrl);

    // Send to backend
    await fetch('http://localhost:5000/api/users/upload-profile', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "john_doe", imageUrl: fileUrl }),
    });
  };

  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error) => alert(`Error: ${error.message}`)}
      />
      {imageUrl && <img src={imageUrl} alt="Profile" width="200" />}
    </div>
  );
};

export default ProfileUploader;
