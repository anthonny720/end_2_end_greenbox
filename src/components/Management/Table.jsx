import React from 'react';
import {map} from "lodash";
import ModalHook from "../util/hooks";
import Modal from "../util/Modal";
import Profile from "./Profile";
import {UserCircleIcon} from "@heroicons/react/24/solid";

const TableManagement = ({data}) => {
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const handleTooltip = (value) => {
        setIsOpen(true)
        setContent(<Profile data={value}/>)
    }


    const RandomColoredText = ({text}) => {
        return <p className={'p-2 rounded-md'}>{text}</p>;
    };


    const columns = ['', '', 'Razón social', 'País', 'Ciudad'];
    return (<div className="w-full">
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className="mx-auto container bg-white dark:bg-gray-800">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead className="sticky top-0 bg-white dark:bg-gray-800 ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400 dark:text-gray-400 font-light  pr-6 text-left text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {map(data, (value, index) => {
                        return (<tr className="h-max border-gray-300 dark:border-gray-200 border-b" key={index}>
                            <th className="text-gray-600 dark:text-gray-400 font-normal  text-center text-sm tracking-normal leading-4  ">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="icon icon-tabler icon-tabler-file cursor-pointer text-blue-400 ml-4 "
                                     width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor"
                                     fill="none" strokeLinecap="round" strokeLinejoin="round"
                                     onClick={() => handleTooltip(value)}
                                >
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
                                    <path
                                        d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>
                                </svg>
                            </th>
                            <td className="pl-8 pr-6 text-left whitespace-nowrap text-sm text-gray-600 text-light dark:text-gray-100 tracking-normal leading-4">
                                <a target="_blank" rel="noopener noreferrer" href={value?.documents}
                                   className={"cursor-pointer"}>
                                    {value?.image ? <img className="h-12 w-max text-gray-400 text-gray-400 opacity-60 "
                                                         src="https://greenbox.pe/wp-content/themes/greenbox/img/homeFoods2-sello-de.png"
                                                         alt=""/> : <UserCircleIcon
                                        className="h-12 w-12 text-gray-400 cursor-pointer text-gray-400 opacity-60 "/>}
                                </a>

                            </td>

                            <td className="text-sm pr-6 whitespace-nowrap text-gray-800 font-bold dark:text-gray-100  leading-4 text-center ">
                                <RandomColoredText text={value?.business_name}/>
                            </td>
                            <td className="text-sm pr-6 whitespace-nowrap text-gray-800 font-normal dark:text-gray-100   text-center">{value?.country}
                            </td>
                            <td className="text-sm pr-6 whitespace-nowrap text-gray-800 font-normal dark:text-gray-100  leading-4 text-center ">{value?.city}</td>
                        </tr>)
                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableManagement;
