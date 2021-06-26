import React, { useEffect } from 'react';
import '../assets/css/style.css';
import '../assets/css/player.css';
import '../assets/css/listen.css';
import Menu from '../components/Menu';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { getMenu } from '../store/menuSlice';

const Listen = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            let result = await axios.get('https://listenapi.hle.com.tw/domain/hhe/selectors')
            dispatch(getMenu(result.data))
        }
        getData()
    }, [dispatch])

    return (
        <React.Fragment>
            <Menu />
            Listen page
        </React.Fragment>
    );
}

export default Listen;