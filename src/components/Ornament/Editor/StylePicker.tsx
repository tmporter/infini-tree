import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { OrnamentStyle } from "../OrnamentData";

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;

  & > * + * {
    margin-left: 1rem;
  }
`;

const StyleOption = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  & > input {
    margin: 3px 0;
    width: 40px;
    height: 40px;
    cursor: pointer;

    &:checked {
      font-weight: bold;
    }
  }
`;

type Props = {
  value: OrnamentStyle;
  onChange: (style: OrnamentStyle) => void;
};

const StylePicker = ({ value, onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as OrnamentStyle);
  };

  return (
    <Wrapper>
      <StyleOption>
        <input
          type="radio"
          name="style"
          value={OrnamentStyle.solid}
          checked={value === OrnamentStyle.solid}
          onChange={handleChange}
        />
        Solid
      </StyleOption>

      <StyleOption>
        <input
          type="radio"
          name="style"
          value={OrnamentStyle.striped}
          checked={value === OrnamentStyle.striped}
          onChange={handleChange}
        />
        Striped
      </StyleOption>

      {/* <StyleOption>
        <input
          type="radio"
          name="style"
          value={OrnamentStyle.zigzag}
          checked={value === OrnamentStyle.zigzag}
          onChange={handleChange}
        />
        Zig-zag
      </StyleOption> */}

      <StyleOption>
        <input
          type="radio"
          name="style"
          value={OrnamentStyle.custom}
          checked={value === OrnamentStyle.custom}
          onChange={handleChange}
        />
        Custom
      </StyleOption>
    </Wrapper>
  );
};

export default StylePicker;
