import React, {useEffect} from 'react';
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {get_analysis} from "../../redux/actions/quality";
import {PaintBrushIcon} from "@heroicons/react/24/outline";

const TableBlueberry = ({update,reference}) => {
    const data = useSelector(state => state.Quality.analysis)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_analysis('blueberry'))
    }, []);


    const RandomColoredText = ({text}) => {
        return <p className={'bg-green-400 bg-opacity-20 p-2 rounded-md'}>{text}</p>;
    };


    const columns = [' ', 'Semana', 'Fecha de Ingreso', 'Lote', 'Brix prom', 'Brix max', 'Brix min', 'Fruta inmadura', 'Pedicelo desgastado', 'Restos de flores','Fruta blanda o sobremadura','Cicatrices','Deshidratada']

    return (<div className="w-full">
        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white dark:bg-gray-800" ref={reference}>
                    <thead className="sticky top-0 bg-white dark:bg-gray-800 ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400 dark:text-gray-400 font-light  px-4 text-left text-sm tracking-normal leading-4 text-center whitespace-nowrap">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((item, index) => {
                        return (<tr className="h-16 border-gray-300 dark:border-gray-200 border-b " key={index}>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">
                                <PaintBrushIcon className={"w-6 h-6 cursor-pointer text-blue-400 hover:text-blue-600"}
                                                onClick={() => update(item)}/>
                            </td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">{item?.week}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">{new Date(item?.entry_date).toLocaleDateString('es-PE', {
                                year: "numeric", month: "numeric", day: "numeric"
                            })}</td>

                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-bold dark:text-gray-100  leading-4 text-center ">
                                <RandomColoredText text={item?.lot_name}/>
                            </td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.average_brix}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.max_brix}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.min_brix}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.immature_fruit}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.worn_pedicel}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.remains_flowers}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.soft}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.scars}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.dehydrated}</td>

                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableBlueberry;
