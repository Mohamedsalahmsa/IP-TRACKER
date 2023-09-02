import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ipAddressAPI = createApi({
    reducerPath: "ipAddressAPI",
    baseQuery: fetchBaseQuery({baseUrl: `https://geo.ipify.org/api/v2`}),
    endpoints: (builder) => (
        {
            trackIP: builder.query({
                query: (inputTern) => ({
                    url: `/country,city?apiKey=at_CbJB9BK2KFXkOOx5FBby7pvUXL4Mm`,
                    params: {ipAddress: inputTern},
                    method: "GET"
                })
            })
        }
    ),
})

export const {useTrackIPQuery} = ipAddressAPI;