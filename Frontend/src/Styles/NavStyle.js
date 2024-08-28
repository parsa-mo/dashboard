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
  margin: 2rem auto 0 auto;
  border-top: 2px solid #ec152a;
`;

const NavButtonDiv = styled.div`
  display: block;
  padding: 1rem 2rem 0 0;
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export { NavContainer, NavLogo, NavLine, NavButtonDiv, ButtonsDiv };
