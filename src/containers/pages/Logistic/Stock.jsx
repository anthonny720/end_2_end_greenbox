import React, {useEffect} from 'react';
import Layout from "../../../hocs/Layout";
import Filter from "../../../components/util/Filter";
import TableStock from "../../../components/Logistic/Stock/Table";
import {useDispatch, useSelector} from "react-redux";
import {delete_output_stock, get_output_stock, get_stock} from "../../../redux/actions/logistic";
import Sidebar from "../../../components/Logistic/Stock/Sidebar";
import {map, sum} from "lodash";
import Humanize from "humanize-plus";
import ModalHook from "../../../components/util/hooks";
import Modal from "../../../components/util/Modal";
import FormStock from "../../../components/Logistic/Stock/Form";
import {MySwal} from "../../../components/util/colors";

const Stock = () => {
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.Logistic.stocks)
    const output = useSelector(state => state.Logistic.output)
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    useEffect(() => {
        dispatch(get_stock())
        dispatch(get_output_stock())
    }, []);

    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormStock lot={stocks} close={openModal}/>
        </div>)
    }
    const handleFilter = (value) => {
        dispatch(get_output_stock(value))
    }

    const handleDeleteStock = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar esta salida?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_output_stock(id))
            }
        })
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <h1 className={"text-black font-bold w-full px-16 pt-4 text-2xl"}>STOCK</h1>
        <div className={"flex gap-4 w-full flex-col  md:flex-row   md:px-16 mt-2 px-4"}>
            <div className={"md:w-2/3 w-full rounded-lg h-max p-4 relative"}>
                <div className={"bg-white w-full rounded-lg p-4"}>
                    <div
                        className={"flex justify-between bg-red-400 p-4 text-black bg-white text-md font-semi-bold hidden md:block overflow-x-scroll scrollbar-hide"}>
                        <span>Movimientos</span>

                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleAddForm()}
                             className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center"
                             width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                             fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <line x1={12} y1={5} x2={12} y2={19}/>
                            <line x1={5} y1={12} x2={19} y2={12}/>
                        </svg>
                        <Filter action={handleFilter}/>

                    </div>
                    <div
                        className={"flex justify-center w-full p-4 text-black text-md font-semi-bold md:bg-gray-200 rounded-lg h-max flex-col md:flex-row"}>
                        <div className={"w-full md:w-1/2 bg-white rounded-l-lg pl-8 py-2"}>
                            <p className={"text-sm font-normal text-gray-400"}>Salida</p>
                            <p className={"text-2xl font-bold"}>{Humanize.formatNumber(sum(map(output, (item) => parseFloat(item.kg))), 2)}</p>
                        </div>
                        <div className={"w-full md:w-1/2 bg-gray-400 bg-opacity-10 rounded-r-lg pl-8 py-2"}>
                            <p className={"text-sm font-normal text-white"}>Stock</p>
                            <p className={"text-2xl font-bold"}>{Humanize.formatNumber(sum(map(stocks, (item) => parseFloat(item.stock))), 2)}</p>
                        </div>
                    </div>
                </div>
                <div className={"bg-white w-full rounded-lg p-4 mt-2 flex flex-col justify-center items-center"}>

                    <TableStock data={output ? output : []} remove={handleDeleteStock}/>
                </div>
            </div>

            <div className={"bg-white md:w-1/3 w-full rounded-lg max-h-screen overflow-y-scroll scrollbar-hide p-4 "}>
                <Sidebar data={stocks ? stocks : []}/>
            </div>

        </div>

    </Layout>);
};

export default Stock;
