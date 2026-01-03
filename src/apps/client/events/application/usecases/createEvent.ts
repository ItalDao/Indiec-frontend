import type { EventRepository } from "../../domain/repositories/EventRepository";

export const createEvent = (repository: EventRepository, formData: FormData) => {
  return repository.create(formData);
};