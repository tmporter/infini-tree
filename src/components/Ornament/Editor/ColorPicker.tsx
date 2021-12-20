import { ChangeEvent, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import styled from "styled-components";
import fontColorContrast from "font-color-contrast";

const Wrapper = styled.div`
  position: relative;
`;

type ButtonProps = { color: string };

const Button = styled.button<ButtonProps>`
  width: 42px;
  height: 42px;
  background: ${(props) => props.color};
  border-radius: 50%;
  border: 0;
  padding: 2px;
  cursor: pointer;
  color: ${(props) => fontColorContrast(props.color)};
  font-weight: bold;
  font-family: inherit;
  font-size: 0.9rem;
  margin-right: 1rem;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(100% - 4px - 1rem);
    height: calc(100% - 4px);
    border-radius: 50%;
    border: 2px solid white;
  }
`;

const Popover = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  z-index: 1;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ColorPicker = ({ value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const closePicker = () => {
    setIsOpen(false);
  };

  const handleChange = (
    color: ColorResult,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onChange(color.hex);
  };

  return (
    <Wrapper>
      <Button color={value} onClick={togglePicker} />

      {isOpen && (
        <Popover>
          <Backdrop onClick={closePicker} />
          <SketchPicker
            color={value}
            onChangeComplete={handleChange}
            disableAlpha={true}
          />
        </Popover>
      )}
    </Wrapper>
  );
};

export default ColorPicker;
