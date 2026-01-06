import type { EventRepository } from "../../domain/repositories/EventRepository";

export const deleteEvent = (repository: EventRepository, id: number) => {
  return repository.delete(id);
};