import { LeafletMouseEvent, Map as LMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Pane, TileLayer } from "react-leaflet";
import styled from "styled-components";
import pattern from "../assets/tree-pattern.jpg";
import { useUser } from "../contexts/UserContext";
import * as apiService from "../services/apiService";
import Menu from "./Menu";
import OrnamentData from "./Ornament/OrnamentData";
import OrnamentMap from "./Ornament/OrnamentMap";
import OrnamentMarker from "./Ornament/OrnamentMarker";

const StyledMapContainer = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
`;

const TreeMap = () => {
  const [ornamentMap, setOrnamentMap] = useState<OrnamentMap>(new Map());
  const { userId } = useUser();

  const fetchOrnaments = async () => {
    const { ornaments } = await apiService.getOrnaments();
    const newMap = new Map(ornaments.map((o) => [o.id, o]));
    setOrnamentMap(newMap);
  };

  const addOrnament = async (ornament: OrnamentData) => {
    const { newOrnament } = await apiService.addOrnament(ornament);
  };

  const onMapCreated = async (map: LMap) => {
    map.on("click", async (event: LeafletMouseEvent) => {
      const ornament = new OrnamentData(event.latlng, "red", userId);
      await addOrnament(ornament);
      await fetchOrnaments();
    });

    await fetchOrnaments();
  };

  const handleDeleteOrnament = async (id: string) => {
    await apiService.deleteOrnament(id);
    await fetchOrnaments();
  };

  const handleOrnamentPrimaryColorChange = async (
    ornament: OrnamentData,
    color: string
  ) => {
    await apiService.updateOrnament({ ...ornament, color });
    await fetchOrnaments();
  };

  const handleOrnamentSecondaryColorChange = async (
    ornament: OrnamentData,
    color: string
  ) => {
    await apiService.updateOrnament({ ...ornament, secondaryColor: color });
    await fetchOrnaments();
  };

  return (
    <StyledMapContainer
      center={[0, 0]}
      zoom={15}
      minZoom={15}
      maxZoom={15}
      whenCreated={onMapCreated}
      zoomControl={false}
    >
      <Menu ornaments={ornamentMap} onDeleteOrnament={handleDeleteOrnament} />

      <Pane name="menu-pane" style={{ zIndex: 500 }}></Pane>

      <TileLayer url={pattern} tileSize={512} />

      {[...ornamentMap.entries()].map(([id, o]) => (
        <OrnamentMarker
          key={id}
          ornament={o}
          onPrimaryColorChange={(color: string) => {
            handleOrnamentPrimaryColorChange(o, color);
          }}
          onSecondaryColorChange={(color: string) => {
            handleOrnamentSecondaryColorChange(o, color);
          }}
        />
      ))}
    </StyledMapContainer>
  );
};

export default TreeMap;
