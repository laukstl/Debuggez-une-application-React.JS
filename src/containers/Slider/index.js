import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Simple boucle infinie
  const nextCard = () => {
    setIndex(prevIndex => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };
  
  // Mise à jour du timer du slide
  const updateSlide = () => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  };
  
  // Init du slide
  useEffect(() => {
    const slideTimer = updateSlide();
    return () => slideTimer();
  }, [index]);
  
  // re-init le timer, re-définit la position, et relance le timer du slide
  const handleRadioClick = (radioIdx) => {
    clearTimeout(updateSlide());
    setIndex(radioIdx);
    updateSlide();
  };
  
  // prévient de multiple instances du cycle de timing
  const handleRadioChange = () => {
    updateSlide();
  };
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={`${Math.random()}`}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${Math.random()}`}
                  type="radio"
                  name="radio-button"
                  onClick={() => handleRadioClick(radioIdx)}
                  onChange={handleRadioChange}
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
