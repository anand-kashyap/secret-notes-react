import React from 'react';
import { NavLink } from 'react-router-dom';
import type { Note } from 'src/interfaces';
import Viewer from './Viewer';

const ViewNotes = () => {
  const notesArr: Note[] = [
    {
      id: 1,
      message: 'iggaM',
      encryption: 'backwards',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      message: 'si iggaM',
      encryption: 'backwards',
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      message: 'led iggaM',
      encryption: 'backwards',
      timestamp: new Date().toISOString(),
    },
  ];

  const getDate = (d: string) => new Date(d).toDateString();

  return (
    <div className="flex flex-col md:flex-row justify-items-stretch w-full relative">
      <section id="notes-list" className="md:w-2/5 px-4 py-2">
        <ul>
          {notesArr.map(({ message, timestamp, id }, i) => (
            <li key={id}>
              <NavLink
                to={`/notes/${id}`}
                activeClassName="bg-blue-200 rounded"
                className="flex justify-between px-2 py-3 mb-2 items-center"
              >
                <span>{message}</span>
                <span className="italic text-xs font-medium tracking-wide">
                  {getDate(timestamp)}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
      <section id="notes-viewer" className="bg-red-200 md:flex-grow px-4 py-2">
        <Viewer />
      </section>
    </div>
  );
};

export default ViewNotes;
