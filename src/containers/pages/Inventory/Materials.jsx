import React, {useEffect} from 'react';
import Layout from "../../../hocs/Layout";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import TableMaterials from "../../../components/Inventory/TableMaterials";
import {get_materials, sync_materials} from "../../../redux/actions/inventory";
import {ArrowPathIcon} from "@heroicons/react/24/outline";
import Filter from "../../../components/Inventory/FilterMaterials";


const Materials = () => {

    const data = useSelector(state => state.Inventory.materials)

    const loading = useSelector(state => state.Inventory.loading)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_materials())
    }, []);

    const sync = () => {
        dispatch(sync_materials())
    }

    return (<Layout>
        <Helmet>
            <title>Materiales</title>
        </Helmet>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>Envases
                    y embalajes</h1>

                <ArrowPathIcon onClick={() => sync()}
                               className={`${loading && 'animate-spin'} text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center`}/>
                <Filter action={get_materials}/>
                <TableMaterials data={data}/>
            </div>


        </div>
    </Layout>);
};

export default Materials;
