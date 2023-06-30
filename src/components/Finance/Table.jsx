import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {DocumentIcon} from "@heroicons/react/24/outline";

const TableCosts = ({update, reference, data, viewer}) => {

    const columns = ['', 'Fecha', 'Materia Prima', 'Kg procesados', 'Kg de producto terminado', 'Rendimiento', 'Costo total', 'Costo producción', 'Costo unitario'];

    const total_cost_variable = (data) => {
        try {
            if (data?.kg_pt_total > 0) {
                return data?.total_cost_mod / data?.kg_pt_total + data?.total_cost_md / data?.kg_pt_total + data?.total_cost_cif / data?.kg_pt_total
            }
            return 0
        } catch (e) {
            return 0;
        }
    };
    const total_cost = (data) => {
        try {
            return parseInt(data?.total_cost_md) + parseInt(data?.total_cost_mod) + parseInt(data?.total_cost_cif)
        } catch (e) {
            return 0;
        }
    };
    const total_cost_production = (data) => {
        try {
            if (data?.kg_pt_total > 0) {
                return (total_cost_variable(data) - data?.item_cif?.GLP?.cost) / data?.kg_pt_total
            }
            return 0
        } catch (e) {
            return 0;
        }
    };

    return (<div className="w-full">
        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">

                <table className="min-w-full bg-white dark:bg-gray-800" ref={reference}>

                    <thead className="sticky top-0 bg-white dark:bg-gray-800 ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400 dark:text-gray-400 font-light  px-6 text-left text-sm tracking-normal whitespace-nowrap leading-4 text-center font-light">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && map(data, (item, index) => {
                        return (<tr className="h-12 border-gray-300 dark:border-gray-200 border-b " key={index}>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100  leading-4 text-center ">
                                <div className={"flex gap-2"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                        update(item)
                                    }}
                                         className={"w-6 h-6 text-blue-500 cursor-pointer"} width={20}
                                         height={20}
                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                                        <line x1={16} y1={5} x2={19} y2={8}/>
                                    </svg>

                                    <DocumentIcon onClick={() => {
                                        viewer(item)
                                    }}
                                                  className={"w-6 h-6 text-gray-500 cursor-pointer"}/>
                                </div>

                            </td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{new Date(item?.date).toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
                            })}</td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.mp}</td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.kg_total, 2)}</td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.kg_pt_total, 2)}</td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.performance, 2)}</td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(total_cost(item), 2)}</td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(total_cost_production(item), 2)}</td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(total_cost_variable(item), 2)}</td>

                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);

};

export default TableCosts;
