import React from 'react';
import Planning from "../Home";
import NavContacts from "../../../../components/Planning/Contacts/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Contacts/Table";
import {useSelector} from "react-redux";
import {get_customers} from "../../../../redux/actions/management";

const Customers = () => {

    const payload = useSelector(state => state.Management.customers);

    return (<Planning>
        <NavContacts/>


        <div className={'p-2 flex justify-between'}>
            <p><span className={"font-bold text-sm text-gray-800"}>2</span><span
                className={"font-medium text-sm text-gray-800"}> Clientes</span></p>
            <p className={"absolute right-0 pr-2 flex gap-2"}>
                <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
            </p>
        </div>

        <div class="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2 max-h-[450px] md:max-h-[550px]">
            <Table data={payload} onLoad={get_customers} path={'customers'}/>
        </div>

    </Planning>);
};

export default Customers;
