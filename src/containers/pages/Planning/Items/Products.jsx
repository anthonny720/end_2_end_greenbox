import React, {Fragment, useState} from 'react';
import Planning from "../Home";
import NavItems from "../../../../components/Planning/Items/Nav";
import {CloudArrowDownIcon, EllipsisVerticalIcon, PencilIcon} from "@heroicons/react/24/solid";
import {Menu, Transition} from "@headlessui/react";
import {TrashIcon} from "@heroicons/react/24/outline";

const Products = () => {
    const [formData, setFormData] = useState({
        name: '', category: ''
    })

    const {name, category} = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (<Planning>
        <NavItems/>
        <div className={'p-2 flex justify-between'}>
            <p><span className={"font-bold text-sm text-gray-800"}>2</span><span
                className={"font-medium text-sm text-gray-800"}> Productos</span></p>
            <p className={"absolute right-0 pr-2 flex gap-2"}>
                <span className={"font-bold text-sm text-green-500 cursor-pointer"}>+ Producto</span>
                <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
            </p>
        </div>

        <div class="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
            <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        <input
                            name="name"
                            id="name"
                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            value={name}
                            onChange={e => onChange(e)}
                            placeholder="Nombre"
                        />

                    </th>
                    <th scope="col" className="px-6 py-3">
                        <input
                            name={'category'}
                            id={'category'}
                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            value={category}
                            onChange={e => onChange(e)}
                            placeholder="Categoría"
                        />
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <input
                            name={'performance'}
                            id={'performance'}
                            type="text"
                            disabled={true}
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            placeholder="Rendimiento"
                        />
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <input
                            name={'capacity'}
                            id={'capacity'}
                            type="text"
                            disabled={true}
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            placeholder="Capacidad"
                        />
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <input
                            name={'price'}
                            id={'price'}
                            disabled={true}
                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            placeholder="Precio"
                        />
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <input
                            name={'um'}
                            id={'um'}
                            disabled={true}
                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            placeholder="U.M."
                        />
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="pr-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                            <p>PIÑA ORGANICA DESHIDRATADO NATURAL OCTAVOS </p>
                        </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        PRODUCTO TERMINADO
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        NXT DRIED
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        NXT DRIED
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        1.50
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        und
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </Planning>);
};

export default Products;
