import {
  faLocationArrow,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useUser } from "../../contexts/UserContext";
import MiniOrnament from "../Ornament/MiniOrnament";
import OrnamentData from "../Ornament/OrnamentData";
import { ListButton, ListContent, ListItem } from "./List";

type Props = {
  ornament: OrnamentData;
  isFavorite: boolean;
  onFavoriteOrnament: (id: string) => void;
  onFlyToOrnament: (id: string) => void;
  onDeleteOrnament: (id: string) => void;
};

const CreatedBy = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 7rem;
  margin: 0 0.5rem;
`;

const OrnamentListItem = ({
  ornament,
  isFavorite,
  onFavoriteOrnament,
  onFlyToOrnament,
  onDeleteOrnament,
}: Props) => {
  const { userId } = useUser();

  const isMine = ornament.creatingUser === userId;

  return (
    <ListItem>
      <ListContent>
        <MiniOrnament
          primaryColor={ornament.color}
          secondaryColor={ornament.secondaryColor}
        />
        <CreatedBy>{ornament.creatingUser}</CreatedBy>
      </ListContent>

      <ListButton color="blue" onClick={() => onFlyToOrnament(ornament.id)}>
        <FontAwesomeIcon icon={faLocationArrow} />
      </ListButton>

      {!isMine && (
        <ListButton
          color="yellow"
          isActive={isFavorite}
          onClick={() => onFavoriteOrnament(ornament.id)}
        >
          <FontAwesomeIcon icon={faStar} />
        </ListButton>
      )}

      {isMine && (
        <ListButton color="red" onClick={() => onDeleteOrnament(ornament.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </ListButton>
      )}
    </ListItem>
  );
};

export default OrnamentListItem;
