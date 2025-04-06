// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";
// import {persistReducer} from "redux-persist"
// import storage from "redux-persist/lib/storage"
// import persistStore from "redux-persist/es/persistStore";

// const rootReducer = combineReducers({user:userReducer})

// const persistConfig = {
//     key:"root",
//     storage,
//     version:1
// }

// const persistReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//     reducer: {
//         user: persistReducer
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });

// export const persistor = persistStore(store)


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer as persistReducerFunction } from "redux-persist"; // ✅ alias to avoid conflict
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const persistReducer = persistReducerFunction(persistConfig, rootReducer); // ✅ uses alias

export const store = configureStore({
    reducer: {
        user: persistReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);


