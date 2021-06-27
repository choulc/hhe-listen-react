import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import listenReducer from './listenSlice'


export default configureStore({
    reducer: {
        'menu': menuReducer,
        'listen': listenReducer,
    }
})