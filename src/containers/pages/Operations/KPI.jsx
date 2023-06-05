import React, {useState} from 'react';
import {Tab} from "@headlessui/react";
import {map} from 'lodash'
import Layout from "../../../hocs/Layout";
import Modal from "../../../components/util/Modal";
import FormUpdateKPI from "../../../components/Operations/KPI/FormUpdate";
import TableKPIPineapple from "../../../components/Operations/KPI/TablePineapple";
import TableKPIMango from "../../../components/Operations/KPI/TableMango";
import TableKPIGoldenberry from "../../../components/Operations/KPI/TableGoldenberry";
import ModalHook from "../../../components/util/hooks";
import Filter from "../../../components/util/Filter";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const KPI = () => {
    let [categories] = useState(["Piña", 'Mango', 'Aguaymanto'])
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const [params, setParams] = useState({start_date: '', end_date: ''});


    const handleOpenModalUpdate = (category, row) => {
        setIsOpen(true)
        setContent(<div className={'h-full bg-white'}>
            <FormUpdateKPI category={category} data={row} close={openModal} params={params}/>
        </div>)
    }
    const handleFilter = (params) => {
        setParams(params)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide "}>KPI</h1>
                <Filter action={handleFilter}/>
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {map(categories, category => (<Tab

                            key={category}
                            className={({selected}) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2', selected ? 'bg-[#26d07d] shadow' : 'text-white    hover:bg-white/[0.12] hover:text-white')}
                        >
                            {category}
                        </Tab>))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel
                            className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                        >
                            <TableKPIPineapple update={handleOpenModalUpdate} params={params}/>

                        </Tab.Panel>

                        <Tab.Panel

                            className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                        >
                            <TableKPIMango update={handleOpenModalUpdate} params={params}/>

                        </Tab.Panel>

                        <Tab.Panel

                            className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                        >
                            <TableKPIGoldenberry update={handleOpenModalUpdate} params={params}/>
                        </Tab.Panel>


                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    </Layout>);
};

export default KPI;
