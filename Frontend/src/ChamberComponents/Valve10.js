import React, { useEffect, useState } from "react";
import valve from "../Images/valve.png";

const Valve3 = ({ state }) => {
  const [isRotated, setIsRotated] = useState(false); // Track whether the image is rotated
  useEffect(() => {
    if (state === "Open") {
      setIsRotated(true);
    } else setIsRotated(false);
    // Toggle rotation state
  }, [state]);
  return (
    <img
      name="valve10"
      src={valve}
      alt="valve"
      style={{
        position: "absolute",
        width: "10%",
        transform: isRotated ? "rotate(-90deg)" : "rotate(0deg)", // Toggle between 90 and 0 degrees
        top: "845px",
        left: "50px",
        transformOrigin: "25%", // Rotate from the right end
        cursor: "pointer",
        transition: "transform 0.3s ease", // Smooth transition between rotations
      }}
    />
  );
};

export default Valve3;
