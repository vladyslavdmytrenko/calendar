import { createApi } from '@reduxjs/toolkit/query/react';

import { client } from './client';

import { CountryDto } from 'src/data-models';

export const countryAPI = createApi({
  reducerPath: 'countryApi',
  baseQuery: client,
  endpoints: builder => ({
    availableCountries: builder.query<CountryDto[], unknown>({
      query: () => `AvailableCountries`,
    }),
  }),
});

export const { useAvailableCountriesQuery } = countryAPI;
