import { createSlice } from '@reduxjs/toolkit'

const menuInit = {
    name: '',
    code: '',
    volumeSelectors: [],
    listenTypeSelectors: [],
    volume1LessonSelectors: [],
    volume2LessonSelectors: [],
    volume3LessonSelectors: [],
    volume4LessonSelectors: [],
    volume5LessonSelectors: [],
}

const menuSlice = createSlice({
    name: 'menu',
    initialState: menuInit,
    reducers: {
        getMenu: (state, action) => {
            state.name = action.payload.name
            state.code = action.payload.code
            state.volumeSelectors = action.payload.volumeSelectors
            state.listenTypeSelectors = action.payload.listenTypeSelectors
            state.volume1LessonSelectors = action.payload.volumeSelectors[0].lessonSelectors
            state.volume2LessonSelectors = action.payload.volumeSelectors[1].lessonSelectors
            state.volume3LessonSelectors = action.payload.volumeSelectors[2].lessonSelectors
            state.volume4LessonSelectors = action.payload.volumeSelectors[3].lessonSelectors
            state.volume5LessonSelectors = action.payload.volumeSelectors[4].lessonSelectors
        },
    }
})

export const { getMenu } = menuSlice.actions

export default menuSlice.reducer