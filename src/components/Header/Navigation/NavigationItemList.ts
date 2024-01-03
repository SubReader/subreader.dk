import styled from "styled-components";

const NavigationItemList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 1rem 0;
  text-align: center;
  background-color: var(--bg);
  box-sizing: border-box;
  z-index: 20;
  @media screen and (min-width: 960px) {
    flex-direction: row;
    background-color: transparent;
    align-items: center;
    padding: 0;
    visibility: visible;
  }
`;

export default NavigationItemList;
