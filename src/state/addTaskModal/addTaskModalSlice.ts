import { createSlice } from "@reduxjs/toolkit";

type addTaskModalType = {
    title: string,
    isOpen: boolean
}

const initialState: addTaskModalType = {
    title: '',
    isOpen: false
}

const AddTaskModalSlice = createSlice({
    name: 'addTaskModal',
    initialState,
    reducers: {
        changeTitle: (state, action) => {
            state.title = action.payload;
        },
        openModal: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
})

export const { changeTitle, openModal } = AddTaskModalSlice.actions;

export default AddTaskModalSlice.reducer;