import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_API_URL } from '@/constants/client.ts';

export const client = fetchBaseQuery({
  baseUrl: BASE_API_URL,
});
