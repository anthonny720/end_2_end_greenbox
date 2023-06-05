import React from 'react';
import Tabs from "../Tabs";
import TableProduction from "./TableProcess";
import TablePacking from "./TablePacking";
import Modal from "../../util/Modal";
import ModalHook from "../../util/hooks";
import FormProcessBanano from "./FormBananoProcess";


const BananoProcess = ({params, category, reference}) => {
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const handleOpenModalUpdate = (data, type) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}>
            <FormProcessBanano data={data} close={openModal} params={params} category={category} typeform={type}/>
        </div>)
    }


    return (<>
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <Tabs table1={<TableProduction reference={reference} update={handleOpenModalUpdate}/>}
              table2={<TablePacking reference={reference} update={handleOpenModalUpdate}/>}/>
    </>);
};


export default BananoProcess;
