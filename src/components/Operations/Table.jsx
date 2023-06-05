import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";

const TableHistoryMP = ({data, update, reference}) => {


    const columns = ['Acciones', 'Semana', 'Mes', 'Año', 'Lote', 'Planta', 'Fecha de salida Campo', 'Fecha de entrada', 'Fecha de descarga', 'Variedad', 'Condicion', 'Transporte', 'Guia de transportista', 'Guia de proveedor', 'Factura', 'Proveedor', 'Procedencia', 'Parcela', 'Promedio jabas', 'Cantidad de jabas', 'Peso bruto', 'Tara', 'Peso neto', 'Peso guia', 'Diferencia netos con guia', '% Rechazo', 'Kg rechazados', 'Kg aprovechables','% Descuento S/','Descuento S/', 'Precio Campo','Precio campo Final', 'Precio planta', 'Flete','Flete/und', 'Total a pagar campo','Total a pagar planta']

    return (<div className="w-full">
        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">

                <table className="min-w-full bg-white dark:bg-gray-800" ref={reference}>

                    <thead className="sticky top-0 bg-white dark:bg-gray-800 ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400 dark:text-gray-400 font-light  px-6 text-left text-sm tracking-normal leading-4 text-center font-light whitespace-nowrap">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((item, index) => {
                        return (<tr className="h-12 border-gray-300 dark:border-gray-200 border-b " key={index}>
                            <td className="pl-8 pr-6 text-left p-2 whitespace-nowrap text-sm text-blue-400  tracking-normal leading-4 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                    update(item)
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
                            <td className="text-sm whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.week}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.month}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.year}</td>
                            <td className="text-xs  whitespace-nowrap text-gray-800 leading-4 text-center font-bold hover:text-green-400 cursor-pointer">{item?.lot?.lot}</td>
                            <td className="text-sm px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.business_maquila_name}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{new Date(item?.lot?.departure_date).toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',

                                hour12: true
                            })}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{new Date(item?.lot?.entry_date).toLocaleDateString('es-PE', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{new Date(item?.lot?.download_date + "T00:00:00-05:00").toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'numeric', day: 'numeric'
                            })}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.variety}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.condition_name}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.transport_name}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.carrier_guide}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.provider_guide}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.invoice}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.provider_name}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.origin}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.lot?.parcels_name}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.avg_box, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.quantity_boxes, 0)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.brute_weight, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.total_tare, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.net_weight, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.guide_weight, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.difference_kg, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.discount, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.discount_net_kg, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.kg_usable, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.discount_price, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.lot?.discount_price_soles, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.price_camp, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.price_camp_final, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.price_plant, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.freight, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.freight_unit, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.total_amount_camp, 2)}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.total_amount_plant, 2)}</td>


                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableHistoryMP;
