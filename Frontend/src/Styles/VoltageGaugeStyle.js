import styled from "@emotion/styled";

const Img = styled.img`
  width: 300px;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const VoltText = styled.span`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -45%);
  color: #ffffff; // or any color that makes the text visible on the image
  font-size: 5rem;
  font-family: "DSDIGI";
`;

//Voltage decimal place
const Span = styled.span`
  font-size: 5.5rem;
  font-family: "DSDIGI";
`;

const AmpText = styled.span`
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -45%);
  color: #ffffff; // or any color that makes the text visible on the image
  font-size: 5rem;
  font-family: "DSDIGI";
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; // Optional: To center the container vertically in the viewport
`;

export { Img, Div, AmpText, VoltText, Container, Span };
