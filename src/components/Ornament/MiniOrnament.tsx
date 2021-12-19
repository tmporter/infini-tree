import styled from "styled-components";

type Props = {
  primaryColor: string;
  secondaryColor?: string;
  scale?: number;
};

const MiniOrnament = styled.div<Props>`
  width: ${(props) => (props.scale || 1) * 2.5}rem;
  height: ${(props) => (props.scale || 1) * 2.5}rem;
  border-radius: 50%;
  background: ${(props) => props.primaryColor};
  border: 1.5px solid ${(props) => props.theme.colors.black}55;
  position: relative;
  overflow: hidden;
  transform: rotate(0deg);
  transition: transform 0.25s ease-in-out;

  &:hover {
    transform: rotate(-10deg);
  }

  &::before {
    content: " ";
    position: absolute;
    top: calc(50% - ${(props) => (props.scale || 1) * 0.5}rem);
    left: 0;
    background: ${(props) => props.secondaryColor || props.primaryColor};
    width: 100%;
    height: ${(props) => (props.scale || 1) * 1}rem;
  }

  box-shadow: 0 1px 5px ${(props) => props.theme.colors.black}55;
`;

export default MiniOrnament;
