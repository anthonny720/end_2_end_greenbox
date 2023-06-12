import React, {useEffect, useRef, useState} from 'react';
import Layout from "../../../hocs/Layout";
import {Helmet} from "react-helmet";
import Modal from "../../../components/util/Modal";
import ModalHook from "../../../components/util/hooks";
import {useDispatch, useSelector} from "react-redux";
import TableStatus from "../../../components/Quality/TableStatus";
import SummaryStatus from "../../../components/Quality/SummaryStatus";
import {get_status} from "../../../redux/actions/quality";
import Filter from "../../../components/Quality/Filter";
import FormStatus from "../../../components/Quality/FormStatus";
import {maxBy} from "lodash";

const Status = () => {
    const tableRef = useRef(null);

    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const dispatch = useDispatch()
    const products = useSelector(state => state.Collection.products)
    const status = useSelector(state => state.Quality.status)
    const [params, setParams] = useState({year: '', product: '', status: '', lot: ''});


    useEffect(() => {
        dispatch(get_status(params))
    }, []);

    const handleUpdate = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}><FormStatus data={data} action={get_status} params={params}
                                                           dispatch={dispatch} close={openModal}/>
        </div>)
    }
    const latestObject = maxBy(status, 'updated_at');


    return (<Layout>
        <Helmet>
            <title>Status</title>
        </Helmet>

        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <SummaryStatus data={status ? status : []}/>
            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-xl md:text-2xl overflow-scroll scrollbar-hide"}>Liberación
                    de producto</h1>
                <Filter reference={tableRef} latestObject={latestObject} products={products} setParams={setParams}
                        action={get_status}/>


                <TableStatus data={status ? status : []} update={handleUpdate} reference={tableRef}/>
            </div>

        </div>
    </Layout>);
};

export default Status;
