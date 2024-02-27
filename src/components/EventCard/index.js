import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

// EventCard.propTypes = {
//   imageSrc: PropTypes.string,
//   imageAlt: PropTypes.string,
//   date: PropTypes.instanceOf(Date),
//   title: PropTypes.string,
//   small: PropTypes.bool,
//   label: PropTypes.string,
// };

// EventCard.defaultProps = {
//   imageSrc: "default_evantCard_Img",
//   date: "2022-12-29T20:28:45.744Z",
//   title: "default_eventCard_Title",
//   label: "default_eventCard_Label",
//   imageAlt: "default_eventCard_altImage",
//   small: false,
// }

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
}

export default EventCard;
