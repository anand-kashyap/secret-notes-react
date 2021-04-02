import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import type { IEncryption } from '~/interfaces';

const useEnc = () => {
  const qCLient = useQueryClient();

  return useQuery<IEncryption[]>(
    'encArr',
    () => {
      const dat = qCLient.getQueryData('encArr');
      return dat
        ? Promise.resolve(dat as IEncryption[])
        : axios.get<IEncryption[]>('/encryptions').then(({ data }) => {
            console.log(data);
            const obj = data.reduce((initObj: IEncryption[], v) => {
              initObj[v.id] = v;
              return initObj;
            }, []);
            return obj;
          });
    },
    { refetchOnWindowFocus: false, cacheTime: 1000 * 60 * 60 },
  );
};

export { useEnc };
