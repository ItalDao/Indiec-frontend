import type{ EventRepository } from "../../domain/repositories/EventRepository";

export const getEvents = (repository: EventRepository) => {
  return repository.getAll();
};