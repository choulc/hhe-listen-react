import { createSlice } from '@reduxjs/toolkit';

const listenInit = {
    lessons: []
}

const listenSlice = createSlice({
    name: 'listen',
    initialState: listenInit,
    reducers: {
        getLessons: (state, action) => {
            state.lessons = action.payload
        }
    }
})

export const { getLessons } = listenSlice.actions

export default listenSlice.reducer