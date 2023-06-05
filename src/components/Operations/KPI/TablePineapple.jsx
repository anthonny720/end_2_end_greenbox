import React, {useEffect} from 'react';
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {get_kpi} from "../../../redux/actions/operations";
import Humanize from "humanize-plus";

const TableKPIPineapple = ({update, params}) => {
    const data = useSelector(state => state.Operations.kpi);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_kpi('pineapple', params))
    }, [params])


    const columns = ['', 'Fecha', 'Semana', 'Lotes', 'Proyección', 'Ingreso', 'Cumplimiento', 'Objetivo', 'Calibre 6', 'Calibre 8 10 12', 'Calibre 14', 'Mad. 0', 'Mad. 1', 'Mad. 2-3', 'Mad. >= 4', 'Precio', 'Objetivo'];

    return (<div className="w-full">
        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">

                <table className="min-w-full bg-white dark:bg-gray-800">

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
                    {data && data.map((item, index) => {
                        return (<tr className="h-12 border-gray-300 dark:border-gray-200 border-b " key={index}>
                            <td className="pl-8 pr-6 text-left p-2 whitespace-no-wrap text-sm text-blue-400  tracking-normal leading-4 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                    update('pineapple', item)
                                }}
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
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{new Date(item?.date).toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
                            })}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{item?.week}</td>

                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{map(item?.lots, (lot, index) => (
                                <p key={index} className={"text-xs"}><span
                                    className={"font-bold text-xs"}>{lot?.lot}</span> {Humanize.formatNumber(lot?.get_total_net_weight, 2)} kg
                                </p>))}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{item?.projected_kg}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.entry, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.compliance, 0)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-bold ">{Humanize.formatNumber(100, 0)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.info?.caliber_6, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.info?.caliber_8_10_12, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.info?.caliber_14, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.info?.maduration_0, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.info?.maduration_1, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.info?.maduration_2_3, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.info?.maduration_4_5, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.price, 2)}</td>
                            <td className="text-sm whitespace-no-wrap text-gray-800 leading-4 text-center font-bold ">{Humanize.formatNumber(item?.price_objective, 2)}</td>
                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableKPIPineapple;
