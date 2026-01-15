import axios from 'axios';
import type { Event } from '../../domain/models/Event';
import type { EventRepository } from '../../domain/repositories/EventRepository';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export class EventApi implements EventRepository {
  async getAll(): Promise<Event[]> {
    const response = await axios.get(`${API_URL}/evento/lista`);
    return response.data.data;
  }

  async getById(id: number): Promise<Event> {
    const response = await axios.get(`${API_URL}/evento/obtener/${id}`);
    return response.data.data;
  }
}