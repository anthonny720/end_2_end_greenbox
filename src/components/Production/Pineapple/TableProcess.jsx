import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";

const TableProduction = ({update,reference}) => {
    const data = useSelector(state => state.Production.process)

    const columns = ['Lote', 'Semana', 'Fecha', 'Kg recibidos', 'Kg Procesados', 'Kg rancha', '% Rancha', 'Kg procesados 1/8', 'Kg habilitado 1/8', 'Kg procesados 1/16', 'Kg habilitado 1/16', 'Kg procesados rings', 'Kg habilitado rings', 'Kg habilitado', '% Habilitado', 'Corona', '%<11', 'Cáscara', '%<42', 'Tronco', '%<42', 'Jugo y pulpa', '%<2',]


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
                            <td title={`Fecha: ${item?.date} \n Kg: ${item?.paid_kg}`} onClick={()=>{update(item,'conditioning')}}
                                className="md:sticky cursor-pointer md:left-0 text-sm px-6 text-black font-bold dark:text-gray-100 bg-white  text-center whitespace-nowrap  dark:bg-gray-800">
                                {item?.lot}
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.week}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.date}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.stock, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold leading-4 text-center ">
                                 <p className={"bg-green-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                {Humanize.formatNumber(item?.paid_kg, 2)}
                                 </p>
                                 </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-red-600 font-bold leading-4 text-center ">
                                 <p className={"bg-red-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                {Humanize.formatNumber(item?.rejected_ranch, 2)}</p></td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-red-600 font-normal leading-4 text-center ">
                                 <p className={"bg-red-400 bg-opacity-60 rounded-lg w-full p-2"}>{Humanize.formatNumber(item?.percent_rejected_ranch, 2)}</p></td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.brute_kg_1_8, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.enabled_1_8, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.brute_kg_1_16, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.enabled_1_16, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.brute_kg_rings, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">
                                    {Humanize.formatNumber(item?.enabled_rings, 2)}
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-blue-800 font-bold leading-4 text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.enabled_kg, 2)}</p>
                            </td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-blue-800 font-normal leading-4 text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.percent_enabled, 2)}</p>

                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.crown, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_crown, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.shell, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_shell, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.trunk, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_trunk, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.juice_pulp, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_juice_pulp, 2)}</td>
                        </tr>
                    )

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


    export default TableProduction;
