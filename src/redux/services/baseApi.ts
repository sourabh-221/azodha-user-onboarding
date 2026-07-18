import {
  type BaseQueryFn,
  createApi,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react';

//* Use this to base endpoints
// https://redux-toolkit.js.org/rtk-query/usage/code-splitting
// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-retries

// Create a baseQuery instance
const rawBaseQuery = fetchBaseQuery({ baseUrl: '/' }); // change this to your backend base URL

// Custom baseQuery wrapped with retry + bail-out logic
const staggeredBaseQueryWithBailOut: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);
    const status = result.error?.status;

    // Immediately stop retrying for these known failure types
    if (status === 401) {
      retry.fail(result.error); // Unauthorized
    }

    if (status === 404) {
      retry.fail(result.error); // Not Found
    }

    if (status === 500) {
      retry.fail(result.error); // Internal Server Error
    }

    return result;
  },
  {
    maxRetries: 5, // Retry network errors or timeouts up to 5 times
  },
);

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: staggeredBaseQueryWithBailOut,
  endpoints: () => ({}), // Add actual endpoints here later
});
