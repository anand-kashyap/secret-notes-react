import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
      <section className="notes-list md:w-2/5 px-4 py-2">
        {!!notesArr.length && (
          <ul>
            {notesArr.map(({ message, timestamp, id }, i) => (
              <li key={id}>
                <NavLink
                  to={`/notes/${id}`}
                  activeClassName="bg-blue-200 rounded"
                  className="flex justify-between px-2 py-3 mb-2 items-center border-b-2 border-gray-200"
                >
                  <span>{message}</span>
                  <span className="italic text-xs font-medium tracking-wide">
                    {getDate(timestamp)}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
        {!!!notesArr.length && (
          <p>
            No notes were found,{' '}
            <Link to="/add" className="text-indigo-500">
              create a new note
            </Link>
            .
          </p>
        )}
      </section>
      <section className="notes-viewer md:flex-grow md:ml-10 px-4 py-2">
        <Viewer />
      </section>
    </div>
  );
};

export default ViewNotes;
