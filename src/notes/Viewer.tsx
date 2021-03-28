import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import type { Note } from 'src/interfaces';
import EditIcon from '../icons/edit.svgr.svg';
import KeyIcon from '../icons/key.svgr.svg';
import TrashIcon from '../icons/trash.svgr.svg';
import { Encryption, NoteMessage, RingButton } from '../utils';

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
      timestamp: d.toDateString() + ' at ' + d.toLocaleTimeString(),
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
      <div className="flex justify-between items-center pb-1 border-b-2 border-gray-200">
        <p>Note No. {noteId}</p>
        <div className="flex items-center">
          <p className="text-xs">{note?.timestamp}</p>
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
            className={`p-1 ml-1 focus:outline-none border-2 border-transparent cursor-pointer rounded ${
              canEdit ? 'border-blue-700 text-blue-700' : ''
            }`}
            onClick={() => setCanEdit(!canEdit)}
          >
            <EditIcon
              width="25"
              height="25"
              className={`fill-current hover:text-blue-700`}
            />
          </button>
          <button className="p-1 ml-1 focus:outline-none border-2 border-transparent cursor-pointer">
            <TrashIcon
              width="25"
              height="25"
              className="fill-current hover:text-red-500"
            />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div>
          <p className="">Encrypted Message</p>
          <p className="font-light">{note?.message}</p>
        </div>
        <fieldset disabled={!canEdit}>
          <Formik
            initialValues={{
              message: 'XXXX',
              encryption: 'nothing',
            }}
            innerRef={form}
            validateOnChange={true}
            onSubmit={(values, actions) => {
              // todo - send to api
              console.log(values);

              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched, setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col mt-2">
                <NoteMessage
                  label="Decrypted Message"
                  touched={touched}
                  errors={errors}
                />
                <Encryption setFieldValue={setFieldValue} />
                {canEdit && (
                  <div className="flex">
                    <RingButton
                      label="Cancel"
                      className="bg-white ring-2 ring-gray-200 focus:ring-gray-400 mr-5"
                      type="button"
                      onClick={() => setCanEdit(false)}
                    />
                    <RingButton label="Update" disabled={isSubmitting} />
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </fieldset>
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
