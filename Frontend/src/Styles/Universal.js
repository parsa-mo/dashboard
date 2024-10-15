import styled from "@emotion/styled";
import { Icon1, Icon2, Icon4, Icon3 } from "../Images/Images";
const Main = styled.main`
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 auto 0 auto !important;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  padding: 3rem 3rem 0 3rem;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2.5rem;
`;

const VisualDiv = styled.div`
  ///background-color: darkgray;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(104, 103, 103, 0.48);
  border-radius: 60px;
  margin: 0 20px;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  display: block;
  width: 80vw;
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin: 20px 0 0 0;
`;

const SubTitle = styled.h1`
  display: block;
  position: relative;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  top: 10;
`;

const Divider = styled.hr`
  width: 90vw;
  border: solid crimson 3px;
  border-radius: 40px;
`;

const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 20%;
`;

const Label = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 1.5rem;
  white-space: pre-line; /* Allows for line breaks in the label */
  color: white;
`;

const Circle = ({ ir, hall }) => {
  let imageSource;
  let labelText;

  if (ir === 1 && hall >= 600) {
    imageSource = Icon1;
    labelText = "Fume Hood: Closed\nEnclosure: Closed";
  } else if (ir === 1 && hall < 600) {
    imageSource = Icon2;
    labelText = "Fume Hood: Closed\nEnclosure: Open";
  } else if (ir !== 1 && hall >= 600) {
    imageSource = Icon3;
    labelText = "Fume Hood: Open\nEnclosure: Closed";
  } else if (ir !== 1 && hall < 600) {
    imageSource = Icon4;
    labelText = "Fume Hood: Open\nEnclosure: Open";
  }

  return (
    <CircleWrapper>
      <Image src={imageSource} alt="status-icon" />
      <Label>{labelText}</Label>
    </CircleWrapper>
  );
};
export { Main, Container, VisualDiv, Title, Row, SubTitle, Divider, Circle };
