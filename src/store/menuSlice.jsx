import { createSlice } from '@reduxjs/toolkit'

const menuInit = {
    name: '',
    code: '',
    volumeSelectors: [],
    listenTypeSelectors: [],
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
        },
    }
})

export const { getMenu } = menuSlice.actions

export default menuSlice.reducer