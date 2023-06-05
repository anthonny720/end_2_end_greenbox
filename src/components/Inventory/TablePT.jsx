import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";

const TableProducts = ({data}) => {


    const columns = ['Lote', 'Stock', 'Producto', 'FCL', 'Certificación', 'Grupo', 'Destinos', 'Presentación', 'Embalaje', 'Empaque', 'F.P', 'F.V', 'N° cajas', 'Articulo', 'Proveedor', 'Campaña', 'Observaciones'];

    return (<div className="w-full">
        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-72">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead className="sticky top-0 bg-white dark:bg-gray-800 ">
                    <tr className="w-full h-16">
                        <th
                            className="md:sticky md:left-0  text-gray-400 dark:text-gray-400 font-light text-left text-sm tracking-normal leading-4 text-center bg-white dark:bg-gray-800"
                        >
                            Lote
                        </th>

                        {map(columns.slice(1), (value, index) => {
                            return (<th
                                key={index}
                                className="text-gray-400 dark:text-gray-400 font-light text-left text-sm tracking-normal leading-4 text-center bg-white dark:bg-gray-800"
                            >
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {map(data, (value, index) => {
                        return (<tr className="h-16 border-gray-300 dark:border-gray-200 border-b" key={index}>
                            <td
                                className="md:sticky md:left-0 text-sm px-6 text-gray-800 font-bold dark:text-gray-100 leading-4 text-center whitespace-nowrap bg-white dark:bg-gray-800">
                                {value?.lot}
                            </td>
                            <td className="text-sm  bg-white px-6 h whitespace-no-wrap text-gray-800 font-bold leading-4 text-center">
                                <p className={"bg-green-400 p-2 bg-opacity-60 rounded-lg font-bold text-white"}>
                                    {Humanize.formatNumber(value?.stock, 2)}
                                </p>

                            </td>
                            <td
                                className=" text-sm px-6 text-gray-800 font-normal dark:text-gray-100 leading-4 text-center whitespace-wrap bg-white dark:bg-gray-800"
                            >         {value?.product + " " + value?.variety + " " + value?.family + " " + value?.cut}
                            </td>

                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">
                                <div className={""}>
                                    <p className={"font-light"}>{value?.fcl}</p>
                                    <span className={"font-bold"}>{value?.client}</span>
                                </div>
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">
                                {value?.certification}
                            </td>

                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">
                                {value?.group}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">
                                {value?.destines}
                            </td>

                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">
                                {value?.presentation}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center">
                                {value?.packaging}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center">
                                {value?.packing}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center">
                                {new Date(value?.date_of_production).toLocaleDateString('es-PE', {
                                    year: 'numeric', month: '2-digit', day: '2-digit'
                                })}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center">
                                {new Date(value?.date_of_expiration).toLocaleDateString('es-PE', {
                                    year: 'numeric', month: '2-digit', day: '2-digit'
                                })}
                            </td>

                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center">
                                {Humanize.formatNumber(value?.boxes, 0)}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center">
                                {value?.article}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">
                                {value?.provider}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center">
                                {value?.campaign}
                            </td>
                            <td className="text-sm bg-white px-6 h whitespace-no-wrap text-gray-800 font-normal leading-4 text-center">
                                {value?.observations}
                            </td>

                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


export default TableProducts;
