import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import EditIcon from '../icons/edit.svgr.svg';
import KeyIcon from '../icons/key.svgr.svg';
import TrashIcon from '../icons/trash.svgr.svg';
import { Encryption, NoteMessage, RingButton } from '../utils';

const NoteView = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const [canEdit, setCanEdit] = useState(false),
    [isDecrypted, setIsDecrypted] = useState(false),
    [encMsg, setEncMsg] = useState('');
  const form = useRef<FormikProps<FormikValues>>(null);

  const getNoteById = (id: number) => {
    const note = {
      message: 'iggaM' + noteId,
      encryption: 'backwards',
    };
    form.current?.setValues(note);
    setEncMsg(note.message);
  };

  const decryptMsg = () => {
    //todo - get decrypted from api
    const formRef = form.current;
    if (formRef) {
      const { message, encryption } = formRef.values as any;
      if (encryption === 'backwards') {
        formRef.setFieldValue('message', message.split('').reverse().join(''));
      }
    }
  };
  useEffect(() => {
    getNoteById(parseInt(noteId));
    setCanEdit(false);
    setIsDecrypted(false);
  }, [noteId]);

  return (
    <div className="w-2/3">
      <div className="flex justify-between items-center">
        <p>Note No. {noteId}</p>
        <div className="flex">
          <button
            disabled={canEdit}
            onClick={() => {
              if (!isDecrypted) {
                decryptMsg();
              } else {
                form.current?.setFieldValue('message', encMsg);
              }
              setIsDecrypted(!isDecrypted);
              setCanEdit(false);
            }}
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
            onClick={() => {
              setCanEdit(!canEdit);
              setIsDecrypted(false);
            }}
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
      <p className="text-sm font-light italic tracking-wider">
        Click on Key icon to decrypt message
      </p>
      <div className="">
        <fieldset disabled={!canEdit}>
          <Formik
            initialValues={{
              message: 'XXX',
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
                <NoteMessage touched={touched} errors={errors} />
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
