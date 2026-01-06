import type { EventRepository } from '../../domain/repositories/EventRepository';

/*export const updateEvent = async (
  repository: EventRepository, 
  id: number, 
  formData: FormData // Cambiado de Partial<Event> a FormData
): Promise<void> => {
  return await repository.update(id, formData);
};
*/


export const updateEvent = (repository: EventRepository, id: number, formData: FormData) => {
  return repository.update(id, formData);
};