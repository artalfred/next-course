import React from "react";

interface Props {
  params: { id: number; photoId: number };
}

const PhotoDetailId = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      Photo: {id} {photoId}
    </div>
  );
};

export default PhotoDetailId;
