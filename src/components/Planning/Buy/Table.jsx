import React, {Fragment, useState} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon, EllipsisVerticalIcon, PencilIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";
import Humanize from "humanize-plus";

const Table = () => {
    const [formData, setFormData] = useState({
        customer: '', order_id: '', quote_id: '',
        sku: '', management: '',
    })

    const {customer, order_id, quote_id,sku,management} = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})

    }
    return (<div class="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'customer'}
                        id={'customer'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={customer}
                        onChange={e=>onChange(e)}
                        placeholder="Cliente"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'management'}
                        id={'management'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={management}
                        onChange={e=>onChange(e)}
                        placeholder="Gestión"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'order_id'}
                        id={'order_id'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={order_id}
                        onChange={e=>onChange(e)}
                        placeholder="OC"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'quote_id'}
                        id={'quote_id'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={quote_id}
                        onChange={e=>onChange(e)}
                        placeholder="PFI"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'full_container_load_name'}
                        id={'full_container_load_name'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled={true}
                        placeholder="FCL"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'process_plant'}
                        id={'process_plant'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled={true}
                        placeholder="Planta de proceso"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'sku'}
                        id={'sku'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={sku}
                        onChange={e=>onChange(e)}
                        placeholder="SKU"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'quantity'}
                        id={'quantity'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled={true}
                        placeholder="Cantidad"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'start_date'}
                        id={'start_date'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled={true}
                        placeholder="Inicio de proceso"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'finish_date'}
                        id={'finish_date'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled={true}
                        placeholder="Fin de proceso"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'shipping_date'}
                        id={'shipping_date'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled={true}
                        placeholder="Fecha de envío"
                    />
                </th>

                <th scope="col" className="px-6 py-3">
                    <input
                        name={'delivery'}
                        id={'delivery'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled={true}
                        placeholder="Estado"
                    />
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                <td className="pr-2 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <div className={"flex gap-2"}>
                        <Menu as="div" className="relative inline-block text-left z-[100]">
                            <div>
                                <Menu.Button
                                    className="w-full justify-center rounded-md  text-sm font-medium ">

                                    <EllipsisVerticalIcon
                                        className="ml-2 -mr-1 h-5 w-5 text-gray-400 hover:text-violet-100"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className="absolute bottom-2 mb-2 w-8  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-2 py-2 cursor-pointer">
                                        <Menu.Item>
                                            <PencilIcon title={"Editar"} className={'w-4 text-blue-400 '}/>
                                        </Menu.Item>

                                    </div>
                                    <div className="px-2 py-2  cursor-pointer">
                                        <Menu.Item>
                                            <TrashIcon title={"Eliminar"} className={'w-4 text-red-400 '}/>
                                        </Menu.Item>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <p>Rapunzel</p>
                    </div>


                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    100%
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    OC0001
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    PFI001
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    FCL 1 MIXTO
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Greenbox
                </td>


                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    AGUAYMANTO CONVENCIONAL DESHIDRATADO NATURAL ENTERO GRANEL 5
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {Humanize.formatNumber(300,2)} kg
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {new Date().toLocaleDateString()}
                </td><td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {new Date().toLocaleDateString()}
                </td><td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {new Date().toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  bg-gray-400 bg-opacity-30 flex items-center justify-between">
                    <p className={"font-bold"}>
                        No recibido
                    </p>

                    <Menu as="div" className="relative inline-block text-left z-[100]">
                        <div>
                            <Menu.Button
                                className="w-full justify-center rounded-md  text-sm font-medium ">
                                <ChevronDownIcon
                                    className="ml-2 -mr-1 h-5 w-5 text-gray-400 hover:text-violet-100"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute bottom-0 right-0  w-max  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-2   cursor-pointer">
                                    <Menu.Item>
                                        <button
                                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <ChevronDownIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            Pendiente
                                        </button>

                                    </Menu.Item>

                                </div>
                                <div className="px-2   cursor-pointer">
                                    <Menu.Item>
                                        <button
                                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <ChevronDownIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            Finalizado
                                        </button>

                                    </Menu.Item>

                                </div>

                            </Menu.Items>
                        </Transition>
                    </Menu>
                </td>

            </tr>


            </tbody>
        </table>
    </div>);
};

export default Table;
