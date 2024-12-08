import * as EventApi from './eventAPI.tsx';
import {EventRequest, EventResponse} from "../../utils/types";


const getEvents = async (username: string, password: string) => {
    try {
        return await EventApi.handleGetEvents(username, password);
    } catch (error) {
        console.error('Error in getEvents:', error);
        throw error;
    }
};

const addEvent = async (username: string, password: string, event: EventRequest): Promise<EventResponse> => {
    try {
        const response = await EventApi.handleAddEvent(username, password, event);
        return response.data as EventResponse;
    } catch (error) {
        console.error('Error in addEvent:', error);
        throw error;
    }
};

const deleteEvent = async (username: string, password: string, eventId: number) => {
    try {
        return await EventApi.handleDeleteEvent(username, password, eventId);
    } catch (error) {
        console.error('Error in deleteEvent:', error);
        throw error;
    }
};

const getEvent = async (username: string, password: string, eventId: number) => {
    try {
        return await EventApi.handleGetEvent(username, password, eventId);
    } catch (error) {
        console.error('Error in getEvent:', error);
        throw error;
    }
};

const getEventsByName = async (name: string, username: string, password: string) => {
    try {
        return await EventApi.handleGetEventsByName(name, username, password);
    } catch (error) {
        console.error('Error in getEventsByName:', error);
        throw error;
    }
};

const getEventsByDateRange = async (username: string, password: string, startDate: string, endDate: string) => {
    try {
        return await EventApi.handleGetEventsByDateRange(username, password, startDate, endDate);
    } catch (error) {
        console.error('Error in getEventsByDateRange:', error);
        throw error;
    }
};

const updateEvent = async (username: string, password: string, eventId: number, event: EventRequest): Promise<EventResponse> => {
    try {
        const response = await EventApi.handleUpdateEvent(username, password, eventId, event);
        return response.data as EventResponse;
    } catch (error) {
        console.error('Error in updateEvent:', error);
        throw error;
    }
}

export default {
    getEvents,
    addEvent,
    deleteEvent,
    getEvent,
    getEventsByName,
    getEventsByDateRange,
    updateEvent
};