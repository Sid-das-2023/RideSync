import React from "react";

const LocationSearchPanel = (props) => {
  const suggestions = props.suggestions || [];

  return (
    <div>
      {suggestions.map((suggestion, index) => {

        return (
          <div
            key={index}
            onClick={() => {
              if (props.activeField === 'pickup') {
                props.setPickup(suggestion.description);
              } else {
                props.setDestination(suggestion.description);
              }
            }}
            className="flex gap-4 m-2 items-center justify-start px-4 py-2 border-2 active:bg-gray-200 rounded-lg"
          >
            <h2 className="flex items-center justify-center h-9 w-9 bg-gray-100 rounded-full">
              <i className="ri-map-pin-2-fill"></i>
            </h2>
            <h4 className="font-medium">{suggestion.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;