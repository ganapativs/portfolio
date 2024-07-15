import styled from 'styled-components';

const SwitcherButton = styled.div`
  position: relative;
  padding: 10px;
  margin-left: 0.4rem;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  background: transparent;

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover {
      --opacity: 0.1;
      background: rgb(
        from rgb(from var(--color-accent) r g b / var(--opacity)) r g b /
          var(--opacity)
      );
    }
  }

  @media screen and (max-width: 767px) {
    width: 40px;
    height: 40px;
    margin-left: 0.2rem;
    transform: scale(0.9) translateX(4px);
  }
`;

export default SwitcherButton;
