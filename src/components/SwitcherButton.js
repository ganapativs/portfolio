import styled from 'styled-components';

const SwitcherButton = styled.div`
  position: relative;
  padding: 10px;
  margin-left: 2rem;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    margin-left: 0.1rem;
    transform: scale(0.8) translateX(4px);
  }
`;

export default SwitcherButton;
