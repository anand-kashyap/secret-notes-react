import { Form, Formik } from 'formik';
import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Encryption, NoteMessage, RingButton } from '../utils';

const NoteView = () => {
  const { noteId } = useParams<{ noteId: string }>();

  return (
    <div>
      Note No. {noteId} opened
      <div className="w-1/2">
        <Formik
          initialValues={{ message: '', encryption: 'nothing' }}
          validateOnChange={true}
          onSubmit={(values, actions) => {
            // todo - send to api
            console.log(values);

            actions.setSubmitting(false);
          }}
        >
          {({ errors, setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col mt-2">
              <NoteMessage errors={errors} />
              <Encryption setFieldValue={setFieldValue} />
              <RingButton disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
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
