import React from 'react';
import EventCard from './EventCard';
import {EventResponse} from "../utils/types";
import '../styles/eventLists.css';

interface EventListsProps {
    evenimente: EventResponse[];
}

const EventLists: React.FC<EventListsProps> = ({evenimente}) => {
    console.log("EventLists received events:", evenimente);

    if (!evenimente || evenimente.length === 0) {
        return <div className="evenimentList"><p>No events found.</p></div>;
    }

    return (
        <div className="evenimentList">
            {evenimente.map((eveniment: EventResponse) => (
                <EventCard
                    key={eveniment.id}
                    id={eveniment.id}
                    name={eveniment.name}
                    description={eveniment.description}
                    startDate={eveniment.startDate}
                    endDate={eveniment.endDate}
                    location={eveniment.location}
                />
            ))}
        </div>
    );
};

export default EventLists;