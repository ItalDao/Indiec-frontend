import type { Event } from "../models/Event";

export interface EventRepository {
  getAll(): Promise<Event[]>;
  getById(id: number): Promise<Event>;
  create(event: FormData): Promise<void>; // Usamos FormData por la imagen
  update(id: number, event: FormData): Promise<void>;
  delete(id: number): Promise<void>;
}