import React from 'react';
import type { Event } from '../../domain/models/Event';
import { Card } from '../../../../../shared/ui';


interface Props {
  events: Event[];
  onViewDetails: (event: Event) => void;
}

export const EventTable: React.FC<Props> = ({ events, onViewDetails }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
      {events.map((event) => (
        <Card
          key={event.idEvento}
          onClick={() => onViewDetails(event)}
          className="group cursor-pointer bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-0 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all flex flex-col shadow-sm"
        >
          {/* BANNER DE LA TARJETA */}
          
          <div className="eventoimg">
  {event.imagen ? (
    <img
      src={`http://localhost:9000/uploads/eventos/${event.imagen}`}
      alt={event.titulo}
      className="imgevent"
      crossOrigin="anonymous"
    />
  ) : (
    <div className="no-image-text">
      Sin Imagen Promocional
    </div>
  )}
</div>


          {/*<div className="w-full h-[200px] bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-200 dark:border-slate-800 img-event">
            {event.imagen ? (
              
              <img
                src={`http://localhost:9000/uploads/eventos/${event.imagen}`}
                alt={event.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 imgevent"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-xs italic">
                Sin Imagen Promocional
              </div>
            )}
          </div>/*}

          {/* CUERPO DE LA TARJETA */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">
              {event.titulo}
            </h3>
            <div className="flex flex-col gap-1 text-slate-500 dark:text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <span className="opacity-70 font-medium">📅{event.fecha?.split('T')[0]}</span>
                <p className="text-slate-400 font-medium flex items-center gap-2">
                <span className="text-purple-500">📍</span> {event.lugar}
              </p>
              </span>
            </div>

            <span className="text-purple-500"></span> {event.estado}


            
          </div>
        </Card>
      ))}
    </div>
  );
};