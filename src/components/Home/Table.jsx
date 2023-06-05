import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useNavigate} from "react-router-dom";
import {EyeIcon} from "@heroicons/react/24/outline";

const TableSummary = ({data}) => {
    const navigate = useNavigate();
    const columns = ['', 'Packing', 'Fecha de descarga', 'Producto', 'Lote', 'Condición', 'Stock', 'Peso neto'];
    return (<div className="w-full">
        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead className="sticky top-0 bg-white dark:bg-gray-800 ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {map(data, (value, index) => {
                        return (

                            <tr className="h-24 border-gray-300 dark:border-gray-200 border-b" key={index}>

                                <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                    <EyeIcon onClick={() => navigate(`/logistic/${value?.lot}`)} className={"h-6 w-6 text-gray-400 hover:text-green-400 cursor-pointer"}/>
                                </td>

                                <td className="text-sm pr-6 font-light whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{value.business_maquila_name}
                                </td>
                                <td className="text-sm pr-6 font-light whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center"> {new Date(value?.download_date ).toLocaleDateString('es-PE',{
                                    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
                                })}
                                </td>
                                <td className="text-sm pr-6 font-light whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{value?.category_name}</td>
                                <td onClick={() => navigate(`/logistic/${value?.lot}`)}
                                    className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center hover:text-green-400 cursor-pointer">{value?.lot}
                                </td>
                                <td className="text-sm pr-6 font-light whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{value?.condition_name}</td>
                                <td className={`text-sm pr-6 font-light whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center `}> <p className={`${value?.stock > 0 && 'bg-green-400 p-2 rounded-2xl text-white bg-opacity-60'}`}>{Humanize.formatNumber(value?.stock,2)}</p> </td>
                                <td className="text-sm pr-6 font-light whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-center">{Humanize.formatNumber(value?.net_weight,2)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableSummary;
