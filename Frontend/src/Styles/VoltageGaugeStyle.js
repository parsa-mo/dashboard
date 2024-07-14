import styled from "@emotion/styled";

const Img = styled.img`
  width: 500px;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Text = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000; // or any color that makes the text visible on the image
  font-size: 8rem;
  font-family: "DSDIGI";
`;

const Span = styled.span`
  font-size: 6rem;
  font-family: "DSDIGI";
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; // Optional: To center the container vertically in the viewport
`;

export { Img, Div, Text, Container, Span };
