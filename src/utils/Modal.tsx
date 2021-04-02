import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import type { Note } from '~/interfaces';
import { axios, usePortal } from '~/utils';

interface IModal {
  note: Note;
  show?: boolean;
  closeModal: () => void;
}

const Portal = (props: any) => {
  const target = usePortal('modal');
  return createPortal(props.children, target as HTMLElement);
};

const Modal = ({ show = false, closeModal, note }: IModal) => {
  const history = useHistory();
  const qClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteNote = () => {
    setIsDeleting(true);
    axios
      .delete(`/notes/${note.id}`)
      .then(() => {
        qClient.invalidateQueries('notes');
        history.replace('/notes');
      })
      .catch(() => setIsDeleting(false));
  };
  return (
    <Portal>
      {show && (
        <div className="overlay" onClick={() => !isDeleting && closeModal()}>
          <div
            className="flex flex-col px-5 py-3 bg-white shadow-lg rounded modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-lg font-medium">
              Delete Secret Note No. {note.id} ?
            </h1>
            <div className="mt-3">{note.message}</div>
            <div className="flex justify-end ">
              <button
                className="text-md border border-gray-200 tracking-wide px-5 py-2 rounded-md focus:outline-none hover:bg-gray-200 mr-2"
                disabled={isDeleting}
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                className="text-md focus:outline-none text-white tracking-wide px-5 py-2 rounded-md bg-red-500 hover:bg-red-700"
                onClick={() => deleteNote()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default Modal;
