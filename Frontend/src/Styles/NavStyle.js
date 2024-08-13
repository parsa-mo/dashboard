import styled from "@emotion/styled";

const NavContainer = styled.div`
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const NavLogo = styled.img`
  width: 200px;
  object-fit: contain;
  padding: 2rem;
  border-radius: 40px;
`;

const NavLine = styled.hr`
  width: 90%;
  border: none;
  margin: 0 auto 0 auto;
  border-top: 2px solid black;
`;

const NavButtonDiv = styled.div`
  display: block;
  padding: 2rem;
`;
export { NavContainer, NavLogo, NavLine, NavButtonDiv };
