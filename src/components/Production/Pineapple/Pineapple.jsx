import React from 'react';
import Tabs from "../Tabs";
import TableProduction from "./TableProcess";
import TablePacking from "./TablePacking";
import Modal from "../../util/Modal";
import ModalHook from "../../util/hooks";
import FormProcessPineapple from "./FormPineappleProcess";
import ReportViewer from "./Report";
import {DocumentTextIcon} from "@heroicons/react/24/outline";


const PineappleProcess = ({params, category, reference}) => {
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const handleOpenModalUpdate = (data, type) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}>
            <FormProcessPineapple data={data} close={openModal} params={params} category={category} typeform={type}/>
        </div>)
    }


    return (<>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <DocumentTextIcon
            className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center"
            onClick={() => {
                setIsOpen(true)
                setContent(<div className={"h-screen"}>
                    <ReportViewer/>
                </div>)
            }
            }/>
        <Tabs table1={<TableProduction reference={reference} update={handleOpenModalUpdate}/>}
              table2={<TablePacking reference={reference} update={handleOpenModalUpdate}/>}/>
    </>);
};


export default PineappleProcess;
