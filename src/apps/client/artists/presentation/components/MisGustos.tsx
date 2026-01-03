import { useState } from 'react';

export const MisGustos = () => {
  const [lista, setLista] = useState(['Zapatillas', 'Programar']);
  const [texto, setTexto] = useState('');

  const agregar = () => {
    if (!texto) return;
    setLista([texto, ...lista]);
    setTexto('');
  };

  const eliminar = (indice: number) => {
    setLista(lista.filter((_, i) => i !== indice));
  };

  const editar = (indice: number) => {
    const nuevoValor = prompt("Edita tu gusto:", lista[indice]);
    if (nuevoValor !== null && nuevoValor.trim() !== "") {
      const nuevaLista = [...lista];
      nuevaLista[indice] = nuevoValor;
      setLista(nuevaLista);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[2rem] w-full max-w-sm shadow-2xl">
        <h1 className="text-xl font-bold text-center mb-6 text-slate-800 uppercase">Mis Gustos</h1>
        
        <div className="flex gap-2 mb-6">
          <input 
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="flex-1 bg-slate-100 p-3 rounded-xl outline-none text-slate-800"
            placeholder="Nuevo gusto..."
          />
          <button onClick={agregar} className="bg-blue-600 text-white px-4 rounded-xl font-bold">+</button>
        </div>

        <div className="space-y-2">
          {lista.map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl group">
              <span className="text-slate-700 font-medium">{item}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => editar(i)} className="text-blue-500 text-xs font-bold">Editar</button>
                <button onClick={() => eliminar(i)} className="text-red-500 text-xs font-bold">Borrar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};