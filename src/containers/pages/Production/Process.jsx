import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from "react-helmet";
import Layout from "../../../hocs/Layout";
import Dropdown from "../../../components/Production/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {get_process} from "../../../redux/actions/production";
import PineappleProcess from "../../../components/Production/Pineapple/Pineapple";
import Filter from "../../../components/Production/Filter";
import {get_providers_category} from "../../../redux/actions/collection";
import SummaryPineapple from "../../../components/Production/Pineapple/SummaryProcessPineapple";
import BananoProcess from "../../../components/Production/Banano/Banano";

const Process = () => {
    const [params, setParams] = useState({'provider': '', 'start_date': '', 'end_date': ''});
    const tableRef = useRef(null);
    const [model_name, setModel_name] = useState('Piña');
    const providers = useSelector(state => state.Collection.providers_category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_process(model_name))
        dispatch(get_providers_category(model_name))
    }, []);
    useEffect(() => {
        dispatch(get_process(model_name))
        dispatch(get_providers_category(model_name))
    }, [model_name]);


    return (<Layout>
        <Helmet>
            <title>Procesos</title>
        </Helmet>


        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4 "}>
            <Dropdown setSelect={setModel_name}/>
            {model_name === 'Piña' && <SummaryPineapple/>}
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>{model_name}</h1>
                <Filter providers={providers} action={get_process} category={model_name} setParams={setParams}
                        reference={tableRef.current}/>
                {model_name === 'Piña' &&
                    <PineappleProcess reference={tableRef} params={params} category={model_name}/>}
                {model_name === 'Banano' &&
                    <BananoProcess reference={tableRef} params={params} category={model_name}/>}

            </div>
        </div>
    </Layout>);
};

export default Process;
