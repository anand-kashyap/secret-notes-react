import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

const CreateNote = () => {
  const encryptions = [
    { name: 'nothing' },
    { name: 'backwards' },
    { name: 'emo-gize', desc: '1 to 1 mapping of letters to emojis' },
    {
      name: 'letter-scramble',
      desc: '1 to 1 mapping of one letter to another',
    },
  ];
  const keyToDesc = encryptions.reduce((obj: any, { name, desc }) => {
    if (desc) {
      obj[name] = desc;
    }
    return obj;
  }, {});

  const [helpText, setHelpText] = useState(''),
    msgInp = useRef(),
    firstCaps = (str: string) => str[0].toUpperCase() + str.slice(1);

  useEffect(() => {
    (msgInp.current as any).focus();
  }, []);

  return (
    <section className="border-2 border-black-200 px-7 py-4 w-2/3 md:w-1/2 xl:w-1/3 rounded-md shadow-xl h-3/4">
      <h1 className="text-xl italic font-semibold">Add a New Note</h1>
      <Formik
        initialValues={{ message: '', encryption: 'nothing' }}
        validateOnChange={true}
        validate={(vals) => {
          const errors: any = {};

          if (!vals.message) {
            errors.message = 'Message cannot be empty';
          }

          return errors;
        }}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({ errors, setFieldValue }) => (
          <Form className="flex flex-col mt-2">
            <div className="flex flex-col">
              <label htmlFor="message" className="">
                Message
              </label>
              <Field
                as="textarea"
                id="message"
                innerRef={msgInp}
                name="message"
                rows="6"
                placeholder="Write something..."
                className={`border-2 border-black-300 rounded-md px-2 py-1 resize-none focus:outline-none mt-2 ${
                  errors.message
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
            <div className="flex flex-col mt-2">
              <label htmlFor="encryption">Encryption Type</label>
              <Field
                as="select"
                id="encryption"
                name="encryption"
                className="border-2 border-black-300 focus:outline-none focus:ring-2 focus:ring-blue-400 px-1 py-2 rounded-sm mt-2"
                onChange={({ target: { value } }: any) => {
                  const val = keyToDesc[value] || '';
                  setHelpText(val);
                  setFieldValue('encryption', value);
                }}
              >
                {encryptions.map(({ name }) => (
                  <option value={name} key={name}>
                    {firstCaps(name)}
                  </option>
                ))}
              </Field>
              {helpText && (
                <span className="text-xs text-gray-500 tracking-wider mt-1">
                  {helpText}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="text-white text-md tracking-wide py-3 bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-200 hover:bg-blue-700 transform transition hover:scale-105 motion-reduce:transform-none w-full self-center mt-4"
            >
              Add
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CreateNote;
