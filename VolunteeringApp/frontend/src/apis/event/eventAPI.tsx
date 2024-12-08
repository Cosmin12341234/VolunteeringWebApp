import axios from "axios";
import {eventsUrl} from "../urlConstants";
import {secureConfig} from "../config/apiConfigs";
import {EventRequest} from "../../utils/types";

export const handleGetEvents = (username: string, password: string) => {
    return axios.get(`${eventsUrl}`, secureConfig(username, password))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error getting events:', error);
            throw error;
        });
}

export const handleAddEvent = (username: string, password: string, event: EventRequest) => {
    return axios.post(`${eventsUrl}`, event, secureConfig(username, password));
}

export const handleDeleteEvent = (username: string, password: string, eventId: number) => {
    return axios.delete(`${eventsUrl}/${eventId}`, secureConfig(username, password))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error deleting event:', error);
            throw error;
        });
}

export const handleGetEvent = (username: string, password: string, eventId: number) => {
    return axios.get(`${eventsUrl}/${eventId}`, secureConfig(username, password))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error getting event:', error);
            throw error;
        });
}

export const handleGetEventsByName = (name: string, username: string, password: string) => {
    return axios.get(`${eventsUrl}/byName/${name}`, secureConfig(username, password))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error getting events by name:', error);
            throw error;
        });
}

export const handleGetEventsByDateRange = (username: string, password: string, startDate: string, endDate: string) => {
    return axios.get(`${eventsUrl}/byDateRange?startDate=${startDate}&endDate=${endDate}`, secureConfig(username, password))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error getting events by date range:', error);
            throw error;
        });
}

export const handleUpdateEvent = (username: string, password: string, eventId: number, event: EventRequest) => {
    return axios.put(`${eventsUrl}/${eventId}`, event, secureConfig(username, password))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error updating event:', error);
            throw error;
        });
};