import { useEffect, useState } from "react";
import EventService from "../../apis/event/EventService";
import { EventRequest, EventResponse, LoginRequest, User } from "../../utils/types";
import '../../styles/adminsPage.css';
import '../../styles/eventLists.css';
import '../../styles/eventCard.css';
import { UserService } from "@/apis/user/UserService.tsx";

const AdminsPage = () => {
    const [events, setEvents] = useState<EventResponse[]>([]);
    const [newEvent, setNewEvent] = useState<EventRequest>({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
    });
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [credentials, setCredentials] = useState<LoginRequest>({
        username: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [updatingEvent, setUpdatingEvent] = useState<EventResponse | null>(null);

    useEffect(() => {
        if (currentUser && currentUser.username && currentUser.password) {
            setCredentials({
                username: currentUser.username,
                password: currentUser.password,
            });
            loadEvents();
        }
    }, [currentUser]);

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        try {
            const user = await UserService.getCurrentUser();
            setCurrentUser(user);
        } catch (err) {
            console.error("Failed to load user info:", err);
            setError("Eroare la încărcarea informațiilor utilizatorului. Vă rugăm să vă autentificați din nou.");
        }
    };

    const loadEvents = async () => {
        if (!currentUser) return;

        setIsLoading(true);
        setError(null);
        try {
            const eventsData = await EventService.getEvents(currentUser.username, currentUser.password);
            setEvents(eventsData);
        } catch (err) {
            console.error("Failed to load events:", err);
            setError("Eroare la încărcarea evenimentelor");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddEvent = async () => {
        if (!credentials.username || !credentials.password) {
            setError("Invalid credentials. Unable to add event.");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            console.log("Adding event with credentials:", credentials.username, credentials.password);
            const addedEvent = await EventService.addEvent(credentials.username, credentials.password, newEvent);
            setEvents((prevEvents) => [...prevEvents, addedEvent]);
            setNewEvent({
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                location: "",
            }); // Reset form
        } catch (error) {
            console.error("Error in addEvent:", error);
            setError("Failed to add event.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteEvent = async (eventId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            console.log("Deleting event with credentials:", credentials.username, credentials.password);
            await EventService.deleteEvent(credentials.username, credentials.password, eventId);
            setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
        } catch (error) {
            console.error("Error in deleteEvent:", error);
            setError("Failed to delete event.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateEvent = async () => {
        if (!credentials.username || !credentials.password || !updatingEvent) {
            setError("Invalid credentials or event. Unable to update event.");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            console.log("Updating event with credentials:", credentials.username, credentials.password);
            const updatedEvent = await EventService.updateEvent(
                credentials.username,
                credentials.password,
                updatingEvent.id!, // Non-null assertion here
                {
                    name: updatingEvent.name,
                    description: updatingEvent.description,
                    startDate: updatingEvent.startDate,
                    endDate: updatingEvent.endDate,
                    location: updatingEvent.location,
                }
            );

            console.log("Updated Event:", updatedEvent); // Debugging line

            setEvents((prevEvents) =>
                prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
            );

            console.log("Events after update:", events); // Debugging line

            setUpdatingEvent(null); // Reset update form state

            // Automatically refresh the page
            window.location.reload();
        } catch (error) {
            console.error("Error in updateEvent:", error);
            setError("Failed to update event.");
        } finally {
            setIsLoading(false);
        }
    };

// Ensure this part remains unchanged in the return statement
    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo text-brown">Admin Panel</div>
                <nav className="admin-nav">
                    <ul>
                        <li className="admin-nav-item bg">
                            <a href="#" className="admin-nav-link active">Events</a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="admin-main">
                <header className="admin-header">
                    <h1 className="admin-title">Event Management</h1>
                    <div className="admin-actions">
                        <button className="admin-button admin-button-primary bg-brown" onClick={loadEvents}>Refresh Events
                        </button>
                    </div>
                </header>

                {isLoading && <p className="admin-text-center">Loading events...</p>}
                {error && <p className="admin-text-center" style={{color: 'red'}}>{error}</p>}

                <div className="admin-card admin-mb-20">
                    <h2 className="admin-card-title">Add New Event</h2>
                    <form className="admin-form" onSubmit={(e) => {
                        e.preventDefault();
                        handleAddEvent();
                    }}>
                        <div className="admin-form-group">
                            <label className="admin-label" htmlFor="eventName">Event Name</label>
                            <input
                                id="eventName"
                                type="text"
                                value={newEvent.name}
                                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                                className="admin-input"
                                required
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label" htmlFor="eventDescription">Description</label>
                            <textarea
                                id="eventDescription"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                className="admin-textarea"
                                required
                            ></textarea>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label" htmlFor="eventStartDate">Start Date</label>
                            <input
                                id="eventStartDate"
                                type="date"
                                value={newEvent.startDate}
                                onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                                className="admin-input"
                                required
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label" htmlFor="eventEndDate">End Date</label>
                            <input
                                id="eventEndDate"
                                type="date"
                                value={newEvent.endDate}
                                onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                                className="admin-input"
                                required
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label" htmlFor="eventLocation">Location</label>
                            <input
                                id="eventLocation"
                                type="text"
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                className="admin-input"
                                required
                            />
                        </div>
                        <button type="submit" className="admin-button admin-button-primary">Add Event</button>
                    </form>
                </div>

                <div className="admin-card">
                    <h2 className="admin-card-title">Event List</h2>
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td>{event.name}</td>
                                <td>{event.description}</td>
                                <td>{event.startDate}</td>
                                <td>{event.endDate}</td>
                                <td>{event.location}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteEvent(event.id)}
                                        className="admin-button admin-button-secondary"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setUpdatingEvent(event)}
                                        className="admin-button admin-button-secondary"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {updatingEvent && (
                    <div className="admin-card">
                        <h2 className="admin-card-title">Update Event</h2>
                        <form className="admin-form" onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateEvent();
                        }}>
                            <div className="admin-form-group">
                                <label className="admin-label" htmlFor="updateEventName">Event Name</label>
                                <input
                                    id="updateEventName"
                                    type="text"
                                    value={updatingEvent.name}
                                    onChange={(e) => setUpdatingEvent({...updatingEvent, name: e.target.value})}
                                    className="admin-input"
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label" htmlFor="updateEventDescription">Description</label>
                                <textarea
                                    id="updateEventDescription"
                                    value={updatingEvent.description}
                                    onChange={(e) => setUpdatingEvent({...updatingEvent, description: e.target.value})}
                                    className="admin-textarea"
                                    required
                                ></textarea>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label" htmlFor="updateEventStartDate">Start Date</label>
                                <input
                                    id="updateEventStartDate"
                                    type="date"
                                    value={updatingEvent.startDate}
                                    onChange={(e) => setUpdatingEvent({...updatingEvent, startDate: e.target.value})}
                                    className="admin-input"
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label" htmlFor="updateEventEndDate">End Date</label>
                                <input
                                    id="updateEventEndDate"
                                    type="date"
                                    value={updatingEvent.endDate}
                                    onChange={(e) => setUpdatingEvent({...updatingEvent, endDate: e.target.value})}
                                    className="admin-input"
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label" htmlFor="updateEventLocation">Location</label>
                                <input
                                    id="updateEventLocation"
                                    type="text"
                                    value={updatingEvent.location}
                                    onChange={(e) => setUpdatingEvent({...updatingEvent, location: e.target.value})}
                                    className="admin-input"
                                    required
                                />
                            </div>
                            <button type="submit" className="admin-button admin-button-primary">Update Event</button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
export default AdminsPage;