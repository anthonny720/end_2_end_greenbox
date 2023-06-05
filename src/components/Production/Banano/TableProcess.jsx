import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";

const TableProduction = ({update,reference}) => {
    const data = useSelector(state => state.Production.process)

    const columns = ['Lote', 'Semana', 'Fecha', 'Kg recibidos', 'Kg Procesados',  'Kg procesados coins', 'Kg habilitado coins', 'Kg procesados slices', 'Kg habilitado slices',  'Kg habilitado', '% Habilitado', 'Cáscara', '%<11', 'Podrido', '%<42', ]


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


                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.brute_kg_coins, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.enabled_coins, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.brute_kg_slices, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.enabled_slices, 2)}</td>


                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-blue-800 font-bold leading-4 text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.enabled_kg, 2)}</p>
                            </td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-blue-800 font-normal leading-4 text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.percent_enabled, 2)}</p>

                            </td>


                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.shell, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_shell, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.rotten, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_rotten, 2)}</td>


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
