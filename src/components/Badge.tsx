import styled, { ThemeColor } from "styled-components";

type Props = {
  color?: keyof ThemeColor;
};

const Badge = styled.span<Props>`
  margin-left: 0.25em;
  margin-right: 0.25em;
  background: ${(props) => props.theme.colors[props.color || "black"]}20;
  color: ${(props) => props.theme.colors[props.color || "black"]};
  padding: 0.25rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.75em;
  vertical-align: middle;
`;

export default Badge;
