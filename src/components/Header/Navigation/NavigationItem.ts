import styled from "styled-components";

const NavigationItem = styled.li`
  list-style: none;
  margin: 1rem;
  font-size: 1.5rem;
  p{
    margin:0;
    color: #fff;
    font-weight:bold;
    cursor:pointer;
  }
  @media screen and (min-width: 960px) {
    margin: 0rem 1rem;
    font-size: 1rem;
  }
`;

export default NavigationItem;
