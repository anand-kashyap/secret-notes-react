import React from 'react';
import { useEnc } from '~/utils';

interface IEncMsgViewer {
  enc: number;
  message: string;
}

const EncMessageViewer = ({ enc, message }: IEncMsgViewer) => {
  const { data } = useEnc();
  const getEncFormatMsg = () => {
    if (data) {
      const encName = data[enc].name;
      switch (encName) {
        case 'emo-gize':
          return message.replace(/1F.{3}/g, (unicode: string) => {
            return String.fromCodePoint(parseInt(unicode, 16));
          });

        default:
          return message;
      }
    }
  };

  return <>{getEncFormatMsg()}</>;
};

export default EncMessageViewer;
