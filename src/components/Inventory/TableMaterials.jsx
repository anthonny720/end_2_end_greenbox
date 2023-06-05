import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";

const TableMaterials = ({data}) => {


    const columns = ['Código', 'Descripción', 'Categoría', 'Estado', 'Stock de seguridad', 'Stock', 'Capacidad', 'Costo',];

    return (<div className="w-full">


        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead className="sticky top-0 bg-white dark:bg-gray-800 ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400 dark:text-gray-400 font-light   text-left text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {map(data, (value, index) => {
                        return (<tr className="h-10 border-gray-300 dark:border-gray-200 border-b" key={index}>
                            <td className="text-sm   h  whitespace-no-wrap text-gray-800 font-bold  leading-4 text-center ">
                                <div className={""}>
                                    <p className={"font-light"}>{value?.code}</p>
                                    <span className={"text-xs"}>{value?.sap}</span>
                                </div>
                            </td>
                            <td className="text-xs   whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">
                                {value?.description}
                            </td>
                            <td className="text-xs   whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">
                                {value?.category}
                            </td>
                            <td className="text-xs   whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">
                                <p className={`${value?.status === 'OK' ? 'bg-green-400' : value?.status ==="AGOTADA"?"bg-red-400" :"bg-yellow-400"} bg-opacity-40 rounded-xl   }`}>{value?.status}</p>

                            </td>
                            <td className="text-xs   whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">
                                {value?.safety_stock}
                            </td>
                            <td className="text-xs font-bold  whitespace-no-wrap text-gray-800  dark:text-gray-100  leading-4 text-center ">
                                {value?.stock}
                            </td>
                            <td className="text-xs   whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">
                                {Humanize.formatNumber(value?.capacity,2)}
                            </td>
                            <td className="text-xs   whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">
                                {Humanize.formatNumber(value?.cost,2)}
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


    export default TableMaterials;
