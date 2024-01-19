import { configureStore } from "@reduxjs/toolkit";
import addTaskModalSlice from "./addTaskModal/addTaskModalSlice";
import alertSlice from "./alertSlice/alertSlice";

export const store = configureStore({
    reducer: {
        addTaskModal: addTaskModalSlice,
        alert: alertSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch