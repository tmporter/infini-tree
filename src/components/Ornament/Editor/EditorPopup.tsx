import { ChangeEvent } from "react";
import { ColorResult, CompactPicker } from "react-color";
import { Popup, PopupProps } from "react-leaflet";
import styled from "styled-components";
import Button from "../../Button";
import OrnamentData from "../OrnamentData";

type Props = PopupProps & {
  ornament: OrnamentData;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onDelete?: () => void;
};

const PopupContent = styled.div.attrs({ className: "popup-content" })`
  /* This ensures the popup is the exact width of the color pickers. */
  width: 246px;
`;

const DeleteButton = styled(Button)`
  margin-top: 1rem;
`;

const EditorPopup = ({
  ornament,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onDelete,
  ...props
}: Props) => {
  const handlePrimaryColorChange = (
    color: ColorResult,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onPrimaryColorChange(color.hex);
  };

  const handleSecondaryColorChange = (
    color: ColorResult,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onSecondaryColorChange(color.hex);
  };

  return (
    <Popup maxWidth={400} {...props}>
      <PopupContent>
        <h4>Primary Color</h4>

        <CompactPicker
          color={ornament.color}
          onChange={handlePrimaryColorChange}
        />

        <h4>Secondary Color</h4>

        <CompactPicker
          color={ornament.secondaryColor}
          onChange={handleSecondaryColorChange}
        />

        <DeleteButton color="red" size="small" onClick={onDelete}>
          Delete
        </DeleteButton>
      </PopupContent>
    </Popup>
  );
};

export default EditorPopup;
