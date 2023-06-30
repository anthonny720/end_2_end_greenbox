import React, {Fragment, useState} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon, EllipsisVerticalIcon, PencilIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";

const Table = () => {
    const [formData, setFormData] = useState({
        supplier: '', order_id: '', order_date: '', invoice_id: '',
    })

    const {supplier, order_id, order_date, invoice_id} = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})

    }
    return (<div class="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'sap'}
                        id={'sap'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={order_id}
                        onChange={e => onChange(e)}
                        placeholder="OC #"
                    />
                </th>

                <th scope="col" className="px-6 py-3">
                    <input
                        name="name"
                        id="name"
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={invoice_id}
                        onChange={e => onChange(e)}
                        placeholder="Factura"
                    />
                </th>

                <th scope="col" className="px-6 py-3">
                    <input
                        name={'category'}
                        id={'category'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={supplier}
                        onChange={e => onChange(e)}
                        placeholder="Proveedor"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'supplier'}
                        id={'supplier'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled={true}
                        placeholder="Valor total"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'price'}
                        id={'price'}
                        disabled={true}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        placeholder="Fecha de llegada"
                    />
                </th>

                <th scope="col" className="px-6 py-3">
                    <input
                        name={'um'}
                        id={'um'}
                        disabled={true}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        placeholder="Envío"
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
                        <p>Cadamksdamks</p>
                    </div>


                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    BOLSA BILAMINADA ASINDJASDNJHASDKNJAD
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    NXT DRIED
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    NXT DRIED
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1.50
                </td>


                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    und
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
