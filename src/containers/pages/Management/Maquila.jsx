import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import TableManagement from "../../../components/Management/Table";
import {Helmet} from "react-helmet";
import SearchBar from "../../../components/util/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {get_suppliers_maquila} from "../../../redux/actions/management";

const Maquila = () => {
    const dispatch = useDispatch();
    const suppliers_maquila = useSelector(state => state.Management.suppliers_maquila)
    const [params, setParams] = useState({name: ''});
    useEffect(() => {
        dispatch(get_suppliers_maquila())
    }, []);

    useEffect(() => {
        dispatch(get_suppliers_maquila(params))
    }, [params]);

    return (<Layout>
        <Helmet>
            <title>Maquila</title>
        </Helmet>
        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl"}>Proveedores de maquila</h1>
                <SearchBar setParams={setParams}/>
                <TableManagement data={suppliers_maquila ? suppliers_maquila : []}/></div>
        </div>
    </Layout>);
};

export default Maquila;
