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
`;

const Title = styled.h1`
  display: block;
  text-align: center;
`;

export { Main, Container, VisualDiv, Title, Row };
