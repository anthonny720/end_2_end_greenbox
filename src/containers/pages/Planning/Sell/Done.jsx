import React from 'react';
import Planning from "../Home";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Buy/Table";
import NavSell from "../../../../components/Planning/Sell/Nav";

const SellDone = () => {
    return (<Planning>
        <NavSell/>
        <div className={'p-2 flex justify-between'}>
            <p><span className={"font-bold text-sm text-gray-800"}>2</span><span
                className={"font-medium text-sm text-gray-800"}> Ventas</span></p>
            <p className={"absolute right-0 pr-2 flex gap-2"}>
                <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
            </p>
        </div>
        <Table/>
    </Planning>);
};

export default SellDone;
