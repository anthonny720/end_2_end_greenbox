import React, {useEffect} from 'react';
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {get_analysis} from "../../redux/actions/quality";
import {PaintBrushIcon} from "@heroicons/react/24/outline";

const TableMango = ({update,reference}) => {
    const data = useSelector(state => state.Quality.analysis)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_analysis('mango'))
    }, []);

    const RandomColoredText = ({text}) => {
        return <p className={'bg-green-400 bg-opacity-20 p-2 rounded-md'}>{text}</p>;
    };


    const columns = [' ', 'Semana', 'Fecha de Ingreso', 'Lote', 'Color 1', 'Color 2', 'Color 2.5', 'Color 3', 'Color >= 3.5', 'Brix < 7', 'Brix 7-8', 'Brix 8-9', 'Brix >9'
        , 'Peso <280', 'Peso 280-300', 'Peso >300', 'Daños mecánicos', 'Rajados', 'Daños de sol', 'Antracnosis', 'Podrido', 'Latex', 'Queresa', 'Insectos', 'Maduro', 'Sobremaduro', 'Total defectos'
    ]

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
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-bold dark:text-gray-100  leading-4 text-center ">{new Date(item?.entry_date).toLocaleDateString('es-PE', {
                                year: "numeric", month: "numeric", day: "numeric"
                            })}</td>

                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light dark:text-gray-100  leading-4 text-center ">
                                <RandomColoredText text={item?.lot_name}/>
                            </td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.color_1}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.color_1_5}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.color_2}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.color_2_5}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.color_3}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.color_3_5}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.brix_7}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.brix_7_8}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.brix_8_9}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.brix_9}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.weight_280}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.weight_280_300}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.weight_300}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.mechanical_damage}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.cracked}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.sun_damage}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.anthracnose}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.rot}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.latex}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.queresa}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.insect_bite}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.mature}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.overripe}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-normal dark:text-gray-100 text-center">{item?.total_defects}</td>

                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableMango;
