import React, { useState } from "react";
import valve from "../Images/valve.png";

const Valve3 = () => {
  const [isRotated, setIsRotated] = useState(false); // Track whether the image is rotated

  const handleClick = () => {
    setIsRotated(!isRotated); // Toggle rotation state
  };
  return (
    <img
      name="valve6"
      src={valve}
      alt="valve"
      style={{
        position: "absolute",
        width: "15%",
        transform: isRotated ? "rotate(0deg)" : "rotate(-90deg)", // Toggle between 90 and 0 degrees
        top: "1530px",
        left: "1605px",
        transformOrigin: "25%", // Rotate from the right end
        cursor: "pointer",
        transition: "transform 0.3s ease", // Smooth transition between rotations
      }}
      onClick={handleClick}
    />
  );
};

export default Valve3;
