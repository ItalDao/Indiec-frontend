import type { Event } from "../models/Event";

export interface EventRepository {
  getAll(): Promise<Event[]>;
  getById(id: number): Promise<Event>;
}