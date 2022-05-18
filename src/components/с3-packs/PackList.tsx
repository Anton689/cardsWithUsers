import React, {useEffect, useState} from 'react';
import s from './PackList.module.css';
import {Navigate, useNavigate, useSearchParams} from 'react-router-dom';
import {Routers} from '../c1-main/routers';
import {useAppDispatch, useAppSelector} from '../../Hooks/hooks';
import {addPackList, getPacksList, setId} from '../../store/reducers/s10_PackListReducer';
import {Search} from './p2-Search/Search';
import {CustomTable} from './Table/CustomTable';
import BasicPagination from './Pagination/Pagination';
import {Range} from '../../Assets/Range/Range';
import loadingPic from '../../Assets/img/animated-chicken-image-0103.gif'
import {ModelWindowDelete} from "../../Assets/ModelWindow/ModelDelete/ModelWindowDelete";
import {ModelWindowAdd} from "../../Assets/ModelWindow/ModeleAdd/ModelWindowAdd";

export const PackList = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const isLoading = useAppSelector(state => state.app.isLoading)
    const userId = useAppSelector(store => store.profile.profile._id);
    const {
        packName,
        sortPacks,
        page,
        pageCount,
        min,
        max,
        user_id
    } = useAppSelector(state => state.packList.queryParams)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [activeDelete, setActiveDelete] = useState(false)

    const [isMyPack, setIsMyPack] = useState(false)

    const [activeAdd, setActiveAdd] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const idPack = searchParams.get('packId')

    useEffect(() => {
        dispatch(getPacksList(searchParams.get('user_id') as string));
    }, [packName, sortPacks, page, pageCount, min, max, user_id]);

    const addPackClickHandler = () => {
        setActiveAdd(true)
    }

    const myHandlerButton = () => {
        setSearchParams({user_id: userId})
        dispatch(setId(searchParams.get('user_id') as string))
        console.log(searchParams.get('user_id'))
        setIsMyPack(true)
    }

    const allHandlerButton = () => {
        const searchParamObj = Object.fromEntries(searchParams)
        delete searchParamObj.user_id
        setSearchParams({user_id: ''})
        dispatch(setId(searchParams.get('user_id') as string))
        setIsMyPack(false)
    }

    if (!isLoggedIn) {
        return <Navigate to={Routers.LOGIN}/>
    }
    return (
        <div className={s.container}>
            <div className={s.packsOptions}>
                <div className={s.optionsButton}>
                    <span>Show packs cards</span>
                    <div className={s.buttonsMyAll}>
                        <button onClick={myHandlerButton}>My</button>
                        <button onClick={allHandlerButton}>All</button>
                    </div>
                </div>
                <div className={s.optionsRange}>
                    <span>Number of cards</span>
                    <div><Range min={min} max={max}/></div>
                </div>
            </div>
            <div className={s.packList}>
                <h3>Pack list</h3>
                <div className={s.packlistSearch}>
                    <Search table='packs'/>
                    <span><button onClick={addPackClickHandler}>Add new pack</button></span>
                </div>
                <div className={s.packlistTable}>
                    {
                        isLoading
                            ? <div className={s.logoPic}><img src={loadingPic} alt=""/></div>
                            : <CustomTable
                                isMyPack={isMyPack}
                                setSearchParams={setSearchParams}
                                setActive={setActiveDelete}/>
                    }
                </div>
                <div className={s.packlistPagination}><BasicPagination/></div>
            </div>
            <ModelWindowDelete
                isMyPack={isMyPack}
                packId={idPack}
                active={activeDelete}
                setActive={setActiveDelete}/>
            <ModelWindowAdd
                isMyPack={isMyPack}
                active={activeAdd}
                setActive={setActiveAdd}/>
        </div>
    );
};
