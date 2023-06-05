import React, {useEffect} from 'react';
import Layout from "../../../hocs/Layout";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {get_products_kardex, get_summary, sync_products_kardex} from "../../../redux/actions/inventory";
import {ArrowPathIcon} from "@heroicons/react/24/outline";
import Filter from "../../../components/Inventory/FilterPT";
import TableProducts from "../../../components/Inventory/TablePT";
import SummaryStock from "../../../components/Inventory/Summary";
import Sidebar from "../../../components/Inventory/Sidebar";


const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.Inventory.products)
    const family = useSelector(state => state.Inventory.summary)
    const fcl_summary = useSelector(state => state.Inventory.fcl_summary)
    const loading = useSelector(state => state.Inventory.loading)


    useEffect(() => {
        dispatch(get_products_kardex())
        dispatch(get_summary())
    }, []);

    const sync = () => {
        dispatch(sync_products_kardex())
    }

    return (<Layout>
        <Helmet>
            <title>Producto Terminado</title>
        </Helmet>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <SummaryStock family={family}/>

            <div className={"w-full flex gap-4 items-center"}>
                <div className={"lg:w-2/3 w-full"}>
                    <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>

                        <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>Kardex
                            de producto terminado</h1>

                        <ArrowPathIcon onClick={() => sync()}
                                       className={`${loading && 'animate-spin'} text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center`}/>
                        <Filter action={get_products_kardex}/>
                        <TableProducts data={products ? products : []}/>
                    </div>
                </div>
                <div className={"lg:w-1/3 hidden lg:block"}>
                    <Sidebar data={fcl_summary ? fcl_summary : []}/>
                </div>


            </div>


        </div>
    </Layout>);
};

export default Products;
