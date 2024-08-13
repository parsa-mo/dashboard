import styled from "@emotion/styled";

const Main = styled.main`
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 auto 0 auto !important;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  padding: 3rem;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;
`;

const VisualDiv = styled.div`
  ///background-color: darkgray;
  width: 80vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(104, 103, 103, 0.48);
  border-radius: 60px;
  margin: 0 30px;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  display: block;
  text-align: center;
  color: white;
  font-size: 4rem;
`;

const SubTitle = styled.h1`
  display: block;
  position: relative;
  text-align: center;
  color: white;
  top: 10;
`;

//Wires
const Wire1 = styled.hr`
  width: 680px;
  position: absolute;
  border: solid 3px black;
  top: 400px;
  z-index: -1;
`;

const Wire2 = styled.hr`
  width: 22vw;
  position: absolute;
  border: solid 3px black;
  background: black;
  top: 715px;
  left: 460px;

  transform: rotate(45deg);
`;

const Wire3 = styled.hr`
  width: 20.5vw;
  position: absolute;
  border: solid 3px black;
  background: black;
  top: 700px;
  left: 1020px;
  transform: rotate(-45deg);
`;

export {
  Main,
  Container,
  VisualDiv,
  Title,
  Row,
  Wire1,
  Wire3,
  Wire2,
  SubTitle,
};
