"use client";

import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {/* TO SHOW THE IMAGE IF THE PUBLICID IS TRUE */}
      {publicId && (
        <CldImage alt="Image" src={publicId} width={500} height={500} />
      )}

      {/* TO UPLOAD IMAGE  */}
      <CldUploadWidget
        uploadPreset="u7p2tlgu"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
        }}
        onSuccess={(result, widget) => {
          if (result.event != "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
