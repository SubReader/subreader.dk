import styled from "styled-components";
const Input = styled.input`
  appearance: none;
  background: transparent;
  text-align: center;
  width: 100%;
  color: #fff;
  font-size: 1.8rem;
  caret-color: var(--blue);
  border: none;
  &::placeholder {
    opacity: 0.25;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 50000s ease-in-out 0s,
      color 5000s ease-in-out 0s;
  }
  &:focus {
    outline: none;
  }
`;
export default Input;
