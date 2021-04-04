import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { Ref } from 'react';
import { useHistory } from 'react-router-dom';
import { Encryption, NoteMessage, RingButton } from '~/utils';

interface IUpdateForm {
  setInitial: () => void;
  form: Ref<FormikProps<FormikValues>>;
  canEdit: boolean;
  reset: boolean;
  setCanEdit: (edit: boolean) => void;
  updateForm: (vals: any) => Promise<any>;
}

const UpdateForm = ({
  form,
  canEdit,
  reset,
  setInitial,
  setCanEdit,
  updateForm,
}: IUpdateForm) => {
  const history = useHistory();

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
          console.log(values);
          actions.setSubmitting(true);
          updateForm(values).finally(() => {
            actions.setSubmitting(false);
            const noteUrl = location.pathname;
            history.push('/');
            history.push(noteUrl);
          });
        }}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col mt-2">
            <NoteMessage
              label="Decrypted Message"
              touched={touched}
              errors={errors}
            />
            <Encryption setFieldValue={setFieldValue} reset={reset} />
            {canEdit && (
              <div className="flex">
                <RingButton
                  label="Cancel"
                  className="bg-white ring-2 ring-gray-200 focus:ring-gray-400 mr-5"
                  type="button"
                  onClick={() => {
                    setInitial();
                    setCanEdit(false);
                  }}
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
