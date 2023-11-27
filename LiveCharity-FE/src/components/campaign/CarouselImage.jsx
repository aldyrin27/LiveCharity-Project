import React from 'react';

function CarouselImage({ imageSrc }) {
  return (
    <div>
      <img
        src={imageSrc}
        style={{ width: '100%', height: '30em', borderRadius: "10px"}}
      />
    </div>
  );
}

export default CarouselImage;
