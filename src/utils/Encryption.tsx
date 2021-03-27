import { Field } from 'formik';
import React, { useState } from 'react';

const Encryption = ({
  setFieldValue,
}: {
  setFieldValue: (field: string, value: any) => void;
}) => {
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
    firstCaps = (str: string) => str[0].toUpperCase() + str.slice(1);

  return (
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
  );
};

export default Encryption;
