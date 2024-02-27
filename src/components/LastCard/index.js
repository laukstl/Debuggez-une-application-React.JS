import PropTypes from "prop-types";
import EventCard from "../EventCard";
import Modal from "../../containers/Modal";
import ModalEvent from "../../containers/ModalEvent";
import "./style.scss";

const LastCard = ({last}) =>
  (
        <Modal key={last.id} Content={<ModalEvent event={last} />}>
          {({ setIsOpened }) => (
            <EventCard
              imageSrc={last?.cover}
              title={last?.title}
              date={new Date(last?.date)}
              small
              label={last.type}
              onClick={() => setIsOpened(true)}
            />
          )}
        </Modal>
  );

LastCard.propTypes = {
  last: PropTypes.shape({
    id: PropTypes.number,
    cover: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    type: PropTypes.string,
  })
}

LastCard.defaultProps = {
  last: PropTypes.shape({
    id: 0,
    cover: "",
    title: "Titre",
    date: "04-04-1999",
    type: "normal",
  })
}

export default LastCard;
