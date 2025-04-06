
import React, { useState } from 'react';

const EventCard = ({ title, date, image, altText = 'Event image', className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`event-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 ${className || ""}`}>
      <div className="relative overflow-hidden aspect-video">
        {image === 'placeholder' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-app-lightGray">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-app-darkGray">
              <path d="M3 9C3 7.89543 3.89543 7 5 7H7L9 4H15L17 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute mt-20 text-app-darkGray">No Image Found</span>
          </div>
        ) : (
          <img
            src={image}
            alt={altText}
            className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? "image-loaded" : "image-loading"}`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-app-darkGray mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default EventCard;
