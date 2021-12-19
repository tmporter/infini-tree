import styled, { ThemeColor } from "styled-components";

type ButtonSize = "small" | "regular";

export type ButtonProps = {
  color?: keyof ThemeColor;
  size?: ButtonSize;
};

const getFontSize = (props: { size?: ButtonSize }): number => {
  switch (props.size) {
    case "small":
      return 0.9;
    default:
      return 1.1;
  }
};

const Button = styled.button<ButtonProps>`
  border: 0;
  background: ${(props) => props.theme.colors[props.color || "blue"]};
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  font-size: ${getFontSize}rem;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    filter: brightness(95%);
  }
`;

export default Button;
