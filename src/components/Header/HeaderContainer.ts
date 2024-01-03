import styled from "styled-components";

const HeaderContainer = styled.header`
  position: absolute;
  width: 100vw;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 1222;
  padding: 0 2rem;
  box-sizing: border-box;
  background: var(--bg);

  @media screen and (min-width: 960px) {
    padding: 1.5rem 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export default HeaderContainer;
