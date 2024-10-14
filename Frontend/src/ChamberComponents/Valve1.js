import React, { useState, useEffect } from "react";
import valve from "../Images/valve.png";

const Valve1 = ({ state }) => {
  const [isRotated, setIsRotated] = useState(false); // Track whether the image is rotated
  useEffect(() => {
    if (state === "Open") {
      setIsRotated(true);
    } else setIsRotated(false);
    // Toggle rotation state
  }, [state]);

  return (
    <img
      name="valve 1"
      src={valve}
      alt="valve"
      style={{
        position: "absolute",
        width: "15%",
        transform: isRotated ? "rotate(180deg)" : "rotate(90deg)", // Toggle between 90 and 0 degrees
        top: "25px",
        left: "330px",
        transformOrigin: "25%", // Rotate from the right end
        cursor: "pointer",
        transition: "transform 0.3s ease", // Smooth transition between rotations
      }}
    />
  );
};

export default Valve1;
