import '../styles/eventCard.css';

interface EventCardProps {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
}

const EventCard: React.FC<EventCardProps> = ({name, description, startDate, endDate, location}) => {
    return (
        <div className="evenimentCard">
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="location">Locație: {location}</p>
            <p className="dates">
                Data început: {startDate} | Data sfârșit: {endDate}
            </p>
        </div>
    );
};

export default EventCard;