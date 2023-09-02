import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { ipAddressAPI } from "../Services/ipAdress";


export const store = configureStore({
    reducer : {
        [ipAddressAPI.reducerPath]: ipAddressAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ipAddressAPI.middleware),
});

setupListeners(store.dispatch)