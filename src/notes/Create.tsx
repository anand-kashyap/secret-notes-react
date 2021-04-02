import { Form, Formik } from 'formik';
import React from 'react';
import { axios, Encryption, NoteMessage, RingButton } from '../utils';

const CreateNote = () => {
  return (
    <section className="border-2 border-black-200 px-7 py-4 w-2/3 md:w-1/2 xl:w-1/3 rounded-md shadow-xl">
      <h1 className="text-xl italic font-semibold">Add a New Note</h1>
      <Formik
        initialValues={{ message: '', encryption: '1' }}
        validateOnChange={true}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(true);
          axios
            .post('/notes', values)
            .then(() => {
              console.log('create note');
              actions.resetForm();
            })
            .finally(() => actions.setSubmitting(false));
        }}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col mt-2">
            <NoteMessage errors={errors} touched={touched} />
            <Encryption setFieldValue={setFieldValue} />
            <RingButton disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CreateNote;
