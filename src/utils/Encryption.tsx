import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import type { IEncryption } from '~/interfaces';

const Encryption = ({
  setFieldValue,
}: {
  setFieldValue: (field: string, value: any) => void;
}) => {
  const qClient = useQueryClient();
  const [encArr, setEncArr] = useState<IEncryption[]>([]);

  useEffect(() => {
    const enc = qClient.getQueryData('encArr');
    setEncArr(enc as IEncryption[]);
  }, []);

  const [helpText, setHelpText] = useState(''),
    firstCaps = (str: string) => str[0].toUpperCase() + str.slice(1);

  return (
    <div className="flex flex-col mt-2">
      <label htmlFor="encryption">Encryption Type</label>
      <Field
        as="select"
        id="encryption"
        name="encryption"
        className="border-2 border-black-300 focus:outline-none focus:ring-2 focus:ring-blue-400 px-2 py-2 rounded-sm mt-2"
        onChange={({ target: { value } }: any) => {
          const val = encArr[value];
          console.log('val', val);
          if (val?.description) {
            setHelpText(val.description);
          }
          setFieldValue('encryption', value);
        }}
      >
        {encArr?.map(({ name, id }) => (
          <option value={id} key={id}>
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
