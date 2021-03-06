import { ErrorMessage, Field, FormikErrors, FormikTouched } from 'formik';
import React from 'react';

const NoteMessage = ({
  errors,
  touched,
  label = 'Message',
}: {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  label?: string;
}) => {
  const reqMessage = (val: string) =>
    !val ? 'Message cannot be empty' : undefined;

  return (
    <div className="flex flex-col">
      <label htmlFor="message">{label}</label>
      <Field
        as="textarea"
        id="message"
        name="message"
        rows="6"
        validate={reqMessage}
        placeholder="Write something..."
        className={`border-2 border-black-300 rounded-md px-2 py-1 resize-none focus:outline-none mt-2 ${
          errors.message && touched.message
            ? 'focus:border-0 border-red-500'
            : 'focus:ring-2 focus:ring-blue-400'
        }`}
      />
      <ErrorMessage
        name="message"
        component="span"
        className="text-xs tracking-wider mt-1 text-red-500"
      />
    </div>
  );
};

export default NoteMessage;
