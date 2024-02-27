import { useEffect, useState } from 'react';
import EventCard from "../EventCard";
import Modal from "../../containers/Modal";
import ModalEvent from "../../containers/ModalEvent";
import { useData } from "../../contexts/DataContext";
import "./style.scss";

const LastEvent = () => {
    const { data, error } = useData();
    const [dataLoaded, setDataLoaded] = useState(null);
    const [last, setLast] = useState(null);
  
    useEffect(() => {
      if (data) {
        setDataLoaded(true);
        const byDateDesc = data?.events.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
        );
        setLast(byDateDesc[0]);
      } else if (error) {
        // eslint-disable-next-line no-console
        console.error('Une erreur s\'est produite lors du chargement des données:', error);
      }
    }, [data, error]);

    if (!dataLoaded) {
        return <div>Loading...</div>;
      }

  return (
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
};

export default LastEvent;
