import { Popup, PopupProps } from "react-leaflet";
import styled from "styled-components";
import Button from "../../Button";
import OrnamentData, { OrnamentStyle } from "../OrnamentData";
import ColorPicker from "./ColorPicker";
import OrnamentPainter from "./OrnamentPainter";
import StylePicker from "./StylePicker";

type Props = PopupProps & {
  ornament: OrnamentData;
  onStyleChange: (style: OrnamentStyle) => void;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onDelete?: () => void;
};

const PopupSectionHeader = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

const PopupContent = styled.div.attrs({ className: "popup-content" })`
  min-width: 250px;
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled(Button)`
  margin-top: 2rem;
`;

const EditorPopup = ({
  ornament,
  onStyleChange,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onDelete,
  ...props
}: Props) => {
  const shouldShowSecondaryColor = ornament.style !== OrnamentStyle.solid;
  const shouldShowEditor = ornament.style === OrnamentStyle.custom;

  return (
    <Popup maxWidth={400} {...props}>
      <PopupContent>
        <PopupSectionHeader>Style</PopupSectionHeader>
        <StylePicker value={ornament.style} onChange={onStyleChange} />

        <PopupSectionHeader>
          Color{shouldShowSecondaryColor && "s"}
        </PopupSectionHeader>

        <div style={{ display: "flex" }}>
          <ColorPicker value={ornament.color} onChange={onPrimaryColorChange} />

          {shouldShowSecondaryColor && (
            <ColorPicker
              value={ornament.secondaryColor || ornament.color}
              onChange={onSecondaryColorChange}
            />
          )}
        </div>

        {shouldShowEditor && (
          <>
            <PopupSectionHeader>Editor</PopupSectionHeader>
            <OrnamentPainter ornament={ornament} />
          </>
        )}

        <div style={{ marginTop: "auto" }}>
          <DeleteButton color="red" size="small" onClick={onDelete}>
            Delete
          </DeleteButton>
        </div>
      </PopupContent>
    </Popup>
  );
};

export default EditorPopup;
