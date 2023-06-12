import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {useParams} from "react-router-dom";

import ModalHook from "../../../components/util/hooks";
import Modal from "../../../components/util/Modal";
import Badge from "../../../components/Operations/Badge";
import Filter from "../../../components/Operations/Filter";
import TableHistoryMP from "../../../components/Operations/Table";
import Layout from "../../../hocs/Layout";
import {get_records_mp} from "../../../redux/actions/operations";
import {get_providers_category} from "../../../redux/actions/collection";
import Form from "./Form";


const Report = () => {
    const tableRef = useRef(null);

    const [params, setParams] = useState();
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const summary = useSelector(state => state.Operations.summary);

    const providers = useSelector(state => state.Collection.providers_category);
    const data = useSelector(state => state.Operations.lots);


    const {category} = useParams()
    const dispatch = useDispatch();


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({type: 'GET_RECORDS_MP_FAIL'})
        dispatch(get_providers_category(category))
        dispatch(get_records_mp(category, params))
    }, []);


    const handleOpenModalUpdate = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}>
            <Form data={data} category={category} close={openModal} params={params}/>
        </div>)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>


        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>Ingresos {category}</h1>
                <Badge data={summary ? summary : []}/>
                <Filter action={get_records_mp} category={category} setParams={setParams}
                        providers={providers ? providers : []} reference={tableRef.current}/>
                <TableHistoryMP reference={tableRef} update={handleOpenModalUpdate} data={data ? data : []}/>
            </div>
        </div>


    </Layout>);
};

export default Report;
