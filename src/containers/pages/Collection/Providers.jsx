import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import {Helmet} from "react-helmet";
import SearchBar from "../../../components/util/SearchBar";
import TableCollection from "../../../components/Collection/Table";
import {useDispatch, useSelector} from "react-redux";
import {get_providers} from "../../../redux/actions/collection";


const Providers = () => {
    const dispatch = useDispatch();
    const providers = useSelector(state => state.Collection.providers)
    const [params, setParams] = useState({name: ''});
    useEffect(() => {
        dispatch(get_providers())
    }, []);

    useEffect(() => {
        dispatch(get_providers(params))
    }, [params]);


    return (<Layout>
        <Helmet>
            <title>Proveedores</title>
        </Helmet>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>Proveedores</h1>

                <SearchBar setParams={setParams}/>
                <TableCollection data={providers ? providers : []}/></div>
        </div>
    </Layout>);
};

export default Providers;
