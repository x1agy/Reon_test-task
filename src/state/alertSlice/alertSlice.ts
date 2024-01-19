import { createSlice } from "@reduxjs/toolkit";

type AlertType = {
    alertMessage: string,
    isOpen: boolean
}

const initialState: AlertType = {
    alertMessage: '',
    isOpen: false
}

const AlertSlice = createSlice({
    name:'alertSlice',
    initialState,
    reducers: {
        fillAlert: (state, action) => {
            state.alertMessage = action.payload;
        },
        changeAlertState: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const {fillAlert, changeAlertState} = AlertSlice.actions;

export default AlertSlice.reducer;