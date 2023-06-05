import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import TableManagement from "../../../components/Management/Table";
import {Helmet} from "react-helmet";
import SearchBar from "../../../components/util/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {get_providers_packing} from "../../../redux/actions/management";

const Packing = () => {
    const dispatch = useDispatch();
    const providers_packing = useSelector(state => state.Management.providers_packing)
    const [params, setParams] = useState({name: ''});
    useEffect(() => {
        dispatch(get_providers_packing())
    }, []);

    useEffect(() => {
        dispatch(get_providers_packing(params))
    }, [params]);
    return (<Layout>
        <Helmet>
            <title>Packing</title>
        </Helmet>
        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>Proveedores de packing</h1>

                <SearchBar setParams={setParams}/>
                <TableManagement data={providers_packing ? providers_packing : []}/></div>
        </div>
    </Layout>);
};

export default Packing;
