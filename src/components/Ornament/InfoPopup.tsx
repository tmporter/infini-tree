import { Popup, PopupProps } from "react-leaflet";
import styled from "styled-components";
import MiniOrnament from "./MiniOrnament";
import OrnamentData from "./OrnamentData";

type Props = PopupProps & {
  ornament: OrnamentData;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CreatedBy = styled.span`
  padding: 0.5rem;
  font-weight: bold;
`;

const InfoPopup = ({ ornament, ...props }: Props) => {
  return (
    <Popup {...props}>
      <Content>
        <MiniOrnament
          primaryColor={ornament.color}
          secondaryColor={ornament.secondaryColor}
          scale={2}
        />
        <CreatedBy>Created by {ornament.creatingUser}</CreatedBy>
      </Content>
    </Popup>
  );
};

export default InfoPopup;
