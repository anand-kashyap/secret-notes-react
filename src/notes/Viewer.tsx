import type { FormikProps, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import type { IEncryption, Note } from 'src/interfaces';
import { axios, useEnc } from '~/utils';
import EncMessageViewer from './EncMessageViewer';
import NoteHead from './viewer/NoteHead';
import UpdateForm from './viewer/UpdateForm';

const NoteView = () => {
  const { noteId } = useParams<{ noteId: string }>(),
    { state } = useLocation();

  const [canEdit, setCanEdit] = useState(false),
    [reset, setReset] = useState(false),
    [isDecrypted, setIsDecrypted] = useState(false),
    { data: encObj } = useEnc();

  const qClient = useQueryClient(),
    form = useRef<FormikProps<FormikValues>>(null);

  const { status, data: note, error, isLoading, isFetching } = useQuery<Note>(
    ['note', state],
    () => getNote(state as Note),
    { refetchOnWindowFocus: false },
  );

  const getNote = async (state: Note) => {
    return state
      ? Promise.resolve(state)
      : axios.get(`/notes/${noteId}`).then(({ data }) => {
          const [note] = data;
          console.log('axios.get -> note', note);
          return note as Note;
        });
  };

  const decryptMsg = () => {
    //todo - get decrypted from api
    const formRef = form.current;
    if (formRef && note?.message && encObj) {
      const encryption = encObj[note.encryption].name;
      const { message } = note;
      if (encryption === 'nothing') {
        return formRef.setFieldValue('message', message);
      }
      return axios
        .post('/decrypt', {
          encryption,
          message,
        })
        .then(({ data }) => {
          return formRef.setFieldValue('message', data.decrypted);
        });
    }
  };
  useEffect(() => {
    qClient.invalidateQueries('note', { exact: true });
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

  useEffect(() => {
    setInitial();
  }, [note]);

  const setInitial = () => {
    if (reset) setReset(false);
    note &&
      form.current?.setFieldValue('encryption', note.encryption) &&
      setReset(true);
  };

  const updateNote = (values: any) => {
    return axios.patch('/notes', {
      id: note?.id,
      encName: (encObj as IEncryption[])[values.encryption].name,
      ...values,
    });
  };

  return (
    <div className="">
      <NoteHead
        note={note}
        setCanEdit={setCanEdit}
        setIsDecrypted={setIsDecrypted}
        canEdit={canEdit}
        isDecrypted={isDecrypted}
      />
      {note && (
        <div className="mt-3">
          <div>
            <p className="">Encrypted Message</p>
            <p className="">
              <EncMessageViewer message={note.message} enc={note.encryption} />
            </p>
          </div>
          <UpdateForm
            setInitial={setInitial}
            reset={reset}
            canEdit={canEdit}
            form={form}
            setCanEdit={setCanEdit}
            updateForm={updateNote}
          />
        </div>
      )}
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
