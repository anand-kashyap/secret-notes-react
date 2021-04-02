import React, { useEffect, useState } from 'react';
import EditIcon from '~/icons/edit.svgr.svg';
import KeyIcon from '~/icons/key.svgr.svg';
import TrashIcon from '~/icons/trash.svgr.svg';
import type { Note } from '~/interfaces';
import Modal from '~/utils/Modal';

interface INoteHead {
  note?: Note;
  canEdit?: boolean;
  isDecrypted?: boolean;
  setIsDecrypted: (dec: boolean) => void;
  setCanEdit: (edit: boolean) => void;
}

const NoteHead = ({
  note,
  canEdit = false,
  isDecrypted = false,
  setIsDecrypted,
  setCanEdit,
}: INoteHead) => {
  const [isDel, setIsDel] = useState(false);

  const [timestamp, setTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    setIsDel(false);
    if (note?.timestamp) {
      const t =
        typeof note.timestamp === 'string'
          ? new Date(note.timestamp)
          : note.timestamp;
      setTimestamp(t);
    }
  }, [note]);

  return (
    <>
      {note && (
        <>
          <div className="flex justify-between items-center pb-1 border-b-2 border-gray-200">
            <p>Note No. {note.id}</p>
            <div className="flex items-center">
              {timestamp && (
                <div>
                  <p className="text-xs font-medium">
                    {timestamp.toDateString()}
                  </p>
                  <p className="text-xs font-medium text-right">
                    {timestamp.toLocaleTimeString()}
                  </p>
                </div>
              )}
              <button
                disabled={canEdit}
                onClick={() => setIsDecrypted(!isDecrypted)}
                className={`p-1 ml-1 focus:outline-none hover:text-green-500 disabled:opacity-50 border-2 border-transparent cursor-pointer rounded ${
                  isDecrypted ? 'border-green-500 text-green-500' : ''
                }`}
              >
                <KeyIcon width="25" height="25" className="fill-current" />
              </button>
              <button
                className={`p-1 ml-1 focus:outline-none border-2 hover:text-blue-700 border-transparent cursor-pointer rounded ${
                  canEdit ? 'border-blue-700 text-blue-700' : ''
                }`}
                onClick={() => setCanEdit(!canEdit)}
              >
                <EditIcon width="25" height="25" className={`fill-current`} />
              </button>
              <button
                className={`p-1 ml-1 focus:outline-none hover:text-red-500 border-2 border-transparent cursor-pointer rounded ${
                  isDel ? 'border-red-500 text-red-500' : ''
                }`}
                onClick={() => setIsDel(!isDel)}
              >
                <TrashIcon width="25" height="25" className="fill-current" />
              </button>
            </div>
          </div>
          <Modal note={note} show={isDel} closeModal={() => setIsDel(false)} />
        </>
      )}
    </>
  );
};

export default NoteHead;
