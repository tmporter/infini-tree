import { DivIcon, LeafletEvent, LeafletMouseEvent, PointTuple } from "leaflet";
import { Marker } from "react-leaflet";
import { useUser } from "../../contexts/UserContext";
import EditorPopup from "./Editor/EditorPopup";
import InfoPopup from "./InfoPopup";
import OrnamentData from "./OrnamentData";
import "./OrnamentMarker.css";

type Props = {
  ornament: OrnamentData;
  radius?: number;
  onClick?: (event: LeafletMouseEvent) => void;
  onPrimaryColorChange?: (color: string) => void;
  onSecondaryColorChange?: (color: string) => void;
};

const OrnamentMarker = ({
  ornament,
  radius = 30,
  onClick = () => {},
  onPrimaryColorChange = () => {},
  onSecondaryColorChange = () => {},
}: Props) => {
  const { userId } = useUser();

  const icon = new DivIcon({
    iconSize: [radius * 2, radius * 2],
    className: "ornament-marker-container",
    html: `
      <div id="wrapper">
        <div id="hook"></div>
        <div id="ornament" style="background: ${ornament.color};">
          <div id="accent" style="background: ${ornament.secondaryColor}"></div>
        </div>
      </div>`,
  });

  // const icon = new DivIcon({
  //   iconSize: [radius * 2, radius * 2],
  //   className: "ornament-marker-container",
  //   html: `<img id="icon" src="${ornamentIcon}" width="${radius * 2}px" >`,
  // });

  const onAdd = (event: LeafletEvent) => {
    // event.target.openPopup();
  };

  const isCreatingUser = ornament.creatingUser === userId;
  const popupOffset: PointTuple = [0, -radius - 10];

  return (
    <Marker
      position={ornament.position}
      icon={icon}
      eventHandlers={{ click: onClick, add: onAdd }}
    >
      {isCreatingUser ? (
        <EditorPopup
          ornament={ornament}
          onPrimaryColorChange={onPrimaryColorChange}
          onSecondaryColorChange={onSecondaryColorChange}
          offset={popupOffset}
          // maxWidth={246} // This does nothing for some reason...
        />
      ) : (
        <InfoPopup ornament={ornament} offset={popupOffset} />
      )}
    </Marker>
  );
};

export default OrnamentMarker;
