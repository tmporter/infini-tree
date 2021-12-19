import styled from "styled-components";
import { ButtonProps } from "../Button";

const List = styled.div.attrs({ className: "list" })`
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  list-style: none;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset;
  border-radius: 5px;
  flex: 1;
`;

export const ListItem = styled.div.attrs({ className: "list-item" })`
  background: ${(props) => props.theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 15px;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
  font-size: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

type ListButtonProps = ButtonProps & {
  isActive?: boolean;
};

export const ListButton = styled.button<ListButtonProps>`
  --color: ${(props) => props.theme.colors[props.color || "red"]};

  border: 0;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "var(--color)" : "inherit")};
  width: 2rem;
  height: 2rem;
  font-size: inherit;
  position: relative;

  &:hover {
    color: var(--color);
  }
`;

export const ListContent = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export default List;
