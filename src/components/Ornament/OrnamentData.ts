import { LatLng } from "leaflet";
import { v4 as uuidv4 } from "uuid";

class OrnamentData {
  id: string;
  position: LatLng;
  color: string;
  creatingUser: string;
  isFavorite: boolean;
  secondaryColor?: string;

  constructor(
    position: LatLng,
    color: string,
    creatingUserId: string,
    secondaryColor: string = color,
    isFavorite: boolean = false
  ) {
    this.id = uuidv4();
    this.position = position;
    this.color = color;
    this.creatingUser = creatingUserId;
    this.secondaryColor = secondaryColor;
    this.isFavorite = isFavorite;
  }
}

export default OrnamentData;
