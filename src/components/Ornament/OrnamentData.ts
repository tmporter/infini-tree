import { LatLng } from "leaflet";
import { v4 as uuidv4 } from "uuid";

export enum OrnamentStyle {
  solid = "solid",
  striped = "striped",
  zigzag = "zigzag",
  custom = "custom",
}

class OrnamentData {
  id: string;
  position: LatLng;
  color: string;
  creatingUser: string;
  isFavorite: boolean;
  secondaryColor?: string;
  style: OrnamentStyle;
  bitmap?: number[];

  constructor(
    position: LatLng,
    color: string,
    creatingUserId: string,
    secondaryColor: string = color,
    isFavorite: boolean = false,
    style: OrnamentStyle = OrnamentStyle.solid
  ) {
    this.id = uuidv4();
    this.position = position;
    this.color = color;
    this.creatingUser = creatingUserId;
    this.secondaryColor = secondaryColor;
    this.isFavorite = isFavorite;
    this.style = style;
  }
}

export default OrnamentData;
