import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { DomEvent } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import styled from "styled-components";
import { useUser } from "../../contexts/UserContext";
import { useFavorites } from "../../services/FavoritesService";
import Badge from "../Badge";
import Button from "../Button";
import OrnamentData from "../Ornament/OrnamentData";
import OrnamentMap from "../Ornament/OrnamentMap";
import List from "./List";
import OrnamentListItem from "./OrnamentListItem";

const LeafletWrapper = styled.div`
  & > .leaflet-control {
    margin-left: 0;
    margin-top: 0;
  }
`;

const MenuLayout = styled.div<{ isOpen: boolean }>`
  width: 325px;
  margin-left: ${(props) => (props.isOpen ? "0" : "-325px")};
  overflow: hidden;
  height: calc(100vh);
  background: ${(props) => props.theme.colors.white};
  padding: 0;
  color: ${(props) => props.theme.colors.black};
  cursor: default;
  position: relative;
  transition: margin-left 0.25s ease-in-out;
  z-index: 0;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
`;

const MenuContent = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MenuHeader = styled.h2`
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

const MenuButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  background: ${(props) => props.theme.colors.white};
  border: 0;
  border-radius: 50%;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  top: 10px;
  right: ${(props) => (props.isOpen ? "-20px" : "-50px")};
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: right 0.25s ease-in-out;
  z-index: 1;
  font-size: 1.2rem;
  color: inherit;
`;

type Props = {
  ornaments: OrnamentMap;
  onDeleteOrnament: (id: string) => void;
};

const Menu = ({ ornaments, onDeleteOrnament }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen((prev) => !prev);
  const map = useMap();
  const { userId } = useUser();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (ref.current) {
      DomEvent.disableClickPropagation(ref.current);
      DomEvent.disableScrollPropagation(ref.current);
    }
  }, []);

  const returnToSpawn = () => {
    map.panTo([0, 0]);
  };

  const centerOrnament = (id: string) => {
    const ornament = ornaments.get(id);
    if (ornament) {
      map.panTo(ornament.position);
    }
  };

  const [favoriteOrnaments, myOrnaments, otherOrnaments] = useMemo(() => {
    const favoriteOrnaments: OrnamentData[] = [];
    const myOrnaments: OrnamentData[] = [];
    const otherOrnaments: OrnamentData[] = [];

    for (const o of [...ornaments.values()]) {
      if (favorites[o.id] !== undefined) {
        favoriteOrnaments.push(o);
      } else if (o.creatingUser === userId) {
        myOrnaments.push(o);
      } else {
        otherOrnaments.push(o);
      }
    }

    return [favoriteOrnaments, myOrnaments, otherOrnaments];
  }, [ornaments, userId, favorites]);

  return (
    <LeafletWrapper ref={ref} className="leaflet-top leaflet-left">
      <div className="leaflet-control">
        <MenuButton onClick={toggleIsOpen} isOpen={isOpen}>
          <FontAwesomeIcon
            icon={faChevronRight}
            className={classNames({ "fa-flip-horizontal": isOpen })}
          />
        </MenuButton>

        <MenuLayout isOpen={isOpen}>
          <MenuContent>
            <MenuHeader>
              Favorites <Badge>{favoriteOrnaments.length}</Badge>{" "}
            </MenuHeader>

            <List>
              {favoriteOrnaments.map((o) => (
                <OrnamentListItem
                  key={o.id}
                  ornament={o}
                  isFavorite={favorites[o.id] !== undefined}
                  onFavoriteOrnament={toggleFavorite}
                  onFlyToOrnament={centerOrnament}
                  onDeleteOrnament={onDeleteOrnament}
                />
              ))}
            </List>

            <MenuHeader>
              My Ornaments <Badge>{myOrnaments.length}</Badge>
            </MenuHeader>

            <List>
              {myOrnaments.map((o) => (
                <OrnamentListItem
                  key={o.id}
                  ornament={o}
                  isFavorite={favorites[o.id] !== undefined}
                  onFavoriteOrnament={toggleFavorite}
                  onFlyToOrnament={centerOrnament}
                  onDeleteOrnament={onDeleteOrnament}
                />
              ))}
            </List>

            <MenuHeader>
              Other Ornaments <Badge>{otherOrnaments.length}</Badge>
            </MenuHeader>

            <List>
              {otherOrnaments.map((o) => (
                <OrnamentListItem
                  key={o.id}
                  ornament={o}
                  isFavorite={favorites[o.id] !== undefined}
                  onFavoriteOrnament={toggleFavorite}
                  onFlyToOrnament={centerOrnament}
                  onDeleteOrnament={onDeleteOrnament}
                />
              ))}
            </List>

            <Button color="blue" onClick={returnToSpawn}>
              Return to Spawn
            </Button>
          </MenuContent>
        </MenuLayout>
      </div>
    </LeafletWrapper>
  );
};

export default Menu;
