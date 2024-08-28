import styled from "@emotion/styled";

const Img = styled.img`
  width: 400px;
  border-radius: 10px;
`;

const Label = styled.span`
  position: absolute;
  top: 57%;
  left: 70%;
  font-size: 4rem;
  color: #28313e;
`;

const Text = styled.span`
  font-family: "DSDIGI";
  position: absolute;
  font-size: 10rem;
  color: #28313e;
  top: 45%;
  left: 30%;
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
