import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import Layout from "../../../hocs/Layout";
import Modal from "../../../components/util/Modal";
import TableCosts from "../../../components/Finance/Table";
import {Helmet} from "react-helmet";
import Filter from "../../../components/util/Filter";
import {get_costs} from "../../../redux/actions/finances";
import ModalHook from "../../../components/util/hooks";
import FormUpdateCosts from "../../../components/Finance/FormUpdateCosts";
import {ReportToPrint} from "../../../components/Finance/ReportCosts";
import {DownloadTableExcel} from "react-export-table-to-excel";


const Costs = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch();
    const costs = useSelector(state => state.Finances.costs);
    const [params, setParams] = useState({'start_date': '', 'end_date': ''});

    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    useEffect(() => {
        dispatch(get_costs())
    }, []);

    const handleFilter = (start_date, end_date) => {
        dispatch(get_costs(start_date, end_date))
        setParams({'startDate': start_date, 'endDate': end_date})
    }

    const handleOpenViewer = (row) => {
        setIsOpen(true)
        setContent(<div className={'w-full bg-white p-2'}>
            <ReportToPrint data={row}/>
        </div>)
    }


    const handleOpenUpdateCostsData = (data) => {
        setIsOpen(true)
        setContent(<FormUpdateCosts close={openModal} values={data} data={data?.item_variable} params={params}/>)
    }


    return (<Layout>
        <Helmet>
            <title>MOD</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide "}>COSTOS
                    DIARIOS</h1>
                <Filter action={handleFilter}/>
                <DownloadTableExcel
                    filename={`Reporte de costos ${params?.startDate} - ${params?.endDate}`}
                    sheet="Reporte"
                    currentTableRef={tableRef.current}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center" width={25}
                         height={25}
                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                    </svg>

                </DownloadTableExcel>
                <TableCosts reference={tableRef} data={costs ? costs : []} update={handleOpenUpdateCostsData} viewer={handleOpenViewer}/>
            </div>
        </div>


    </Layout>);
};

export default Costs;
