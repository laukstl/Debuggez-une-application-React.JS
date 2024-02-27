import { useState, useEffect } from 'react';
import { useData } from "../../contexts/DataContext";
import LastCard from "../LastCard";

const LastEvent = () => {
  const [last, setLast] = useState({});
  const { data, error } = useData();

  useEffect(() => {
    if (data) {
      const byDateDesc = data?.events.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
      );
      setLast(byDateDesc[0]);
    } else if (error) {
      // eslint-disable-next-line no-console
      console.error('Une erreur s\'est produite lors du chargement des données:', error);
    }
  }, [data, error]);
  return <LastCard last={last} />
}

export default LastEvent;