import styled from "@emotion/styled";

const Img = styled.img`
  width: 300px;
  border-radius: 10px;
  padding: 0 40px;
`;

const Label = styled.span`
  position: absolute;
  top: 60%;
  left: 72%;
  font-size: 3rem;
  color: #28313e;
`;

const Text = styled.span`
  font-family: "DSDIGI";
  position: absolute;
  font-size: 8rem;
  color: #28313e;
  top: 70%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjusts to ensure centering */
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export { Img, Text, Container, Div, Label };
