import React from 'react';
import { useQuery } from 'react-query';
import { Link, NavLink } from 'react-router-dom';
import type { Note } from 'src/interfaces';
import { axios } from '~/utils';
import EncMessageViewer from './EncMessageViewer';
import Viewer from './Viewer';

const ViewNotes = () => {
  const { status, data: notesArr, error, isLoading } = useQuery<Note[]>(
    'notes',
    () => axios.get('/notes').then(({ data }) => data),
    { refetchOnWindowFocus: false },
  );

  const getDate = (d: string) => new Date(d).toDateString();

  return (
    <div className="flex flex-col md:flex-row justify-items-stretch w-full relative">
      <section className="notes-list md:w-2/5 px-4 py-2">
        {isLoading && 'Loading...'}
        {!!notesArr?.length && (
          <ul>
            {notesArr.map(({ message, timestamp, encryption, id }, i) => (
              <li key={id}>
                <NavLink
                  to={{ pathname: `/notes/${id}`, state: notesArr[i] }}
                  activeClassName="bg-blue-100 rounded"
                  className="flex justify-between px-2 py-3 mb-2 items-center border-2 border-gray-200 rounded"
                >
                  {/* <div> */}
                  {/* {encObj && <span>{encObj[encryption].name}</span>} */}
                  <span className="whitespace-nowrap mr-2 overflow-ellipsis overflow-hidden">
                    <EncMessageViewer message={message} enc={encryption} />
                  </span>
                  {/* </div> */}
                  <span className="flex-none italic text-xs font-medium tracking-wide">
                    {getDate(timestamp as string)}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
        {!!!notesArr?.length && (
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
