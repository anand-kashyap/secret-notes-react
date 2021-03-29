import type { FormikProps, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import type { Note } from 'src/interfaces';
import NoteHead from './viewer/NoteHead';
import UpdateForm from './viewer/UpdateForm';

const NoteView = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const [canEdit, setCanEdit] = useState(false),
    [isDecrypted, setIsDecrypted] = useState(false),
    [note, setNote] = useState<Note>();
  const form = useRef<FormikProps<FormikValues>>(null);

  const getNoteById = (id: number) => {
    const d = new Date();
    const note: Note = {
      id,
      message: 'iggaM' + noteId,
      encryption: 'backwards',
      timestamp: d,
    };
    form.current?.setFieldValue('encryption', note.encryption);
    setNote(note);
  };

  const decryptMsg = () => {
    //todo - get decrypted from api
    const formRef = form.current;
    if (formRef && note) {
      if (note.encryption === 'backwards') {
        formRef.setFieldValue(
          'message',
          note.message.split('').reverse().join(''),
        );
      }
    }
  };
  useEffect(() => {
    getNoteById(parseInt(noteId));
    setCanEdit(false);
    setIsDecrypted(false);
  }, [noteId]);

  useEffect(() => {
    if (isDecrypted) {
      decryptMsg();
    } else {
      form.current?.setFieldValue('message', 'XXXX');
    }
  }, [isDecrypted]);

  useEffect(() => {
    setIsDecrypted(canEdit);
  }, [canEdit]);

  return (
    <div className="">
      <NoteHead
        note={note}
        setCanEdit={setCanEdit}
        setIsDecrypted={setIsDecrypted}
        canEdit={canEdit}
        isDecrypted={isDecrypted}
      />
      <div className="mt-3">
        <div>
          <p className="">Encrypted Message</p>
          <p className="">{note?.message}</p>
        </div>
        <UpdateForm canEdit={canEdit} form={form} setCanEdit={setCanEdit} />
      </div>
    </div>
  );
};

const Viewer = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:noteId`}>
        <NoteView />
      </Route>
      <Route path={match.path}>
        <h3>Select a Note to view its details here.</h3>
      </Route>
    </Switch>
  );
};

export default Viewer;
