import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { Ref } from 'react';
import { Encryption, NoteMessage, RingButton } from '~/utils';

interface IUpdateForm {
  form: Ref<FormikProps<FormikValues>>;
  canEdit: boolean;
  setCanEdit: (edit: boolean) => void;
}

const UpdateForm = ({ form, canEdit, setCanEdit }: IUpdateForm) => {
  return (
    <fieldset disabled={!canEdit}>
      <Formik
        initialValues={{
          message: 'XXXX',
          encryption: '1',
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
  );
};

export default UpdateForm;
