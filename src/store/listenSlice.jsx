import { createSlice } from '@reduxjs/toolkit';

const listenInit = {
    lessons: [],
    isNullListenPacks: true,
}

const listenSlice = createSlice({
    name: 'listen',
    initialState: listenInit,
    reducers: {
        getLessons: (state, action) => {
            state.lessons = action.payload
        },
        updateIsNullListenPacks: (state, action) => {
            state.isNullListenPacks = action.payload
        },
    }
})

export const { getLessons, updateIsNullListenPacks } = listenSlice.actions

export default listenSlice.reducer