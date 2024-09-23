import styled from "@emotion/styled";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  color: rgba(29, 29, 29, 0.9);
  font-weight: bold;
  padding: 0 20px 0 20px;
`;

const Square = styled.div`
  height: auto;
  margin-left: 30px;
  border: solid 10px white;
  border-radius: 20px;
`;

const HR = styled.hr`
  width: 98%;
  border: solid 4px white;
  padding: 0;
  margin: 0;
`;

const P = styled.p`
  display: flex;
  align-items: center;
  font-size: 2.2em;
`;

export { Square, Div, HR, P };
