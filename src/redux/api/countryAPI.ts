import { createApi } from '@reduxjs/toolkit/query/react';

import { client } from './client';

import { PublicHoliday, PublicHolidayList } from 'src/data-models';
import { getDateSting } from '@utils/date.ts';

export const countryAPI = createApi({
  reducerPath: 'countryApi',
  baseQuery: client,
  endpoints: builder => ({
    nextPublicHolidaysWorldwide: builder.query<PublicHolidayList, unknown>({
      query: () => `NextPublicHolidaysWorldwide`,
      transformResponse: (response: PublicHoliday[]) => {
        return response.reduce<PublicHolidayList>((acc, holiday) => {
          const timestamp = new Date(getDateSting(holiday.date)).getTime();

          if (acc[timestamp]) {
            acc[timestamp].push(holiday);
            return acc;
          }
          acc[timestamp] = [holiday];
          return acc;
        }, {});
      },
    }),
  }),
});

export const { useNextPublicHolidaysWorldwideQuery } = countryAPI;
