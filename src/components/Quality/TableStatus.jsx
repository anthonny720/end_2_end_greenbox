import React from 'react';
import {map, maxBy} from 'lodash';
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/solid";

const TableStatus = ({data, update, reference}) => {
    const latestObject = maxBy(data, 'updated_at');
    const columns = ['', 'Lote MP', 'Lote PT', 'Lote Cliente', 'Status', 'Destino', 'Microbiología', 'Fosetyl', 'Pesticidas', 'Observaciones']
    return (<div className="overflow-auto scrollbar-hide w-full ">
        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white dark:bg-gray-800" ref={reference}>
                    <thead className="sticky top-0 bg-white dark:bg-gray-800">
                    <tr className={"text-xs text-black absolute left-0"}>
                        <td>
                            Última
                            actualización: {latestObject && new Date(latestObject?.updated_at).toLocaleDateString('es-PE', {
                            day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric"
                        })}
                        </td>
                    </tr>
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className="text-gray-600 dark:text-gray-400 font-normal whitespace-nowrap  text-left text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {map(data, (value, index) => {
                        return (<tr className="h-12 border-gray-300 dark:border-gray-200 border-b" key={index}>
                            <td className="  text-left whitespace-nowrap px-4 text-sm text-blue-400 dark:text-gray-100 tracking-normal leading-4 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => update(value)}
                                     className="icon cursor-pointer icon-tabler icon-tabler-edit" width={20}
                                     height={20}
                                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                                    <line x1={16} y1={5} x2={19} y2={8}/>
                                </svg>
                            </td>
                            <td className="text-sm  whitespace-nowrap px-4 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{value?.lot_name}</td>
                            <td className="text-sm  whitespace-wrap font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{value?.pt_list}</td>
                            <td className="text-sm  whitespace-nowrap px-4 font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{value?.lot_client}</td>


                            <td className="text-sm  whitespace-nowrap px-4 font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">
                                <span
                                    className={`${value?.status === 'O' ? 'bg-orange-400' : value?.status === 'P' ? 'bg-yellow-400' : value?.status === 'R' ? 'bg-green-400' : 'bg-red-400'} text-white rounded-xl p-1 bg-opacity-60`}>
                                    {value?.status_name}
                                </span>

                            </td>
                            <td className="text-sm  whitespace-nowrap px-4 font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{value?.destine_name}</td>
                            <td className="text-sm  whitespace-nowrap px-4 font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">
                                <span className={"w-full flex justify-center"}>
                                    {value?.microbiological_analysis ?
                                        <CheckCircleIcon className={'text-green-400 w-6 h-6'}/> :
                                        <XCircleIcon className={"text-red-400 w-6 h-6 "}/>}
                                </span>

                            </td>
                            <td className="text-sm  whitespace-nowrap px-4 font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">
                                <span className={"w-full flex justify-center"}>
                                    {value?.fosetyl ? <CheckCircleIcon className={'text-green-400 w-6 h-6'}/> :
                                        <XCircleIcon className={"text-red-400 w-6 h-6 "}/>}
                                </span>
                            </td>
                            <td className="text-sm  whitespace-nowrap px-4 font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">
                                <span className={"w-full flex justify-center"}>
                                    {value?.pesticide ? <CheckCircleIcon className={'text-green-400 w-6 h-6'}/> :
                                        <XCircleIcon className={"text-red-400 w-6 h-6 "}/>}
                                </span>
                            </td>
                            <td className="text-sm  whitespace-nowrap px-4 font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{value?.observations}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableStatus;
