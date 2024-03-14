import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  // const { data, error } = useData();
  const [index, setIndex] = useState(0);
  const [init, setInit] = useState(false);
  const [listLength, setListLength] = useState(0);
  const timer = useRef(null);

  const byDateDesc = data?.focus?.sort((evtA, evtB) => // if (data && data.focus) ... else if (error) ...
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 // triage du plus ancien au plus récent
  );

  // Simple boucle infinie
  const nextCard = () => {
    setIndex(index < listLength - 1 ? index + 1 : 0); // -1 correction index VS length
  };
  
  // Mise à jour du timer du slide
  const updateSlide = () => {
    timer.current = setTimeout(nextCard, 5000);
  };

// Update si l'index change ( donc dans la boucle ou au click )
  useEffect(() => {
    updateSlide();
  }, [index])

  // Force le premier update aprés l'init
  useEffect(() => {
    if (init) {
      updateSlide();
    }
  }, [init]);

  // Init du slide
  if(!init) {
    if(byDateDesc){
      setListLength(byDateDesc.length);
      updateSlide();
      setInit(true);
    }
  }
  
  // re-init le timer, re-définit la position, et relance le timer du slide
  const handleRadioClick = (radioIdx) => {
    clearTimeout(timer.current);
    setIndex(radioIdx);
    updateSlide();
  };
  
  // prévient de multiple instances du cycle de timing
  const handleRadioChange = () => {
    clearTimeout(timer.current);
  };
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`CardList_${event.title}`}>
          <div
            key={`SlideCard_${event.id}`}
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
                  key={`Slider_${Math.random()}`}
                  type="radio"
                  name="radio-button"
                  onClick={() => handleRadioClick(radioIdx)}
                  onChange={handleRadioChange}
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
