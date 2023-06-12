import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {update_process} from "../../../redux/actions/production";


const FormProcessPineapple = ({close, data, category, params, typeform}) => {

    const dispatch = useDispatch()
    const columns = [
        {name: 'enabled_1_4', title: 'Habilitado 1/4', type: 'text', maxLength: 8},
        {name: 'enabled_1_8', title: 'Habilitado 1/8', type: 'text', maxLength: 8},
        {name: 'enabled_1_16', title: 'Habilitado 1/16', type: 'text', maxLength: 8},
        {name: 'enabled_rings', title: 'Habilitado rings', type: 'text', maxLength: 8},
        {name: 'rejected_ranch', title: 'Rechazo', type: 'text', maxLength: 7},
        {name: 'crown', title: 'Corona', type: 'text', maxLength: 7},
        {name: 'shell', title: 'Cáscara', type: 'text', maxLength: 7},
        {name: 'trunk', title: 'Tronco', type: 'text', maxLength: 7},
        {name: 'juice_pulp', title: 'Jugo y pulpa', type: 'text', maxLength: 7},

    ]
    const columns_2 = [
        {name: 'pt_cut_1_4', title: 'PT 1/4', type: 'text', maxLength: 8},
        {name: 'pt_cut_1_8', title: 'PT 1/8', type: 'text', maxLength: 8},
        {name: 'pt_cut_1_16', title: 'PT 1/16', type: 'text', maxLength: 8},
        {name: 'pt_cut_rings', title: 'PT Rings', type: 'text', maxLength: 8},
        {name: 'pt_cut_recuperable', title: 'PT Recuperable', type: 'text', maxLength: 8},
        {name: 'local', title: 'Local', type: 'text', maxLength: 6},
        {name: 'quality', title: 'Calidad', type: 'text', maxLength: 5},
         {name: 'lot_cut_1_8', title: 'Lote 1/8', type: 'text', maxLength: 8},
        {name: 'lot_cut_1_16', title: 'Lote 1/16', type: 'text', maxLength: 8},
        {name: 'lot_cut_rings', title: 'Lote Rings', type: 'text', maxLength: 8},
    ]

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_process(data?.id, category, form, params))
            close()
        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4 ">
                {typeform === 'conditioning' &&
                    <div className={"grid gap-2 grid-cols-2"}>
                        {map(columns, (column, index) => (<div key={index}>
                            <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}:</p>
                            <input type={column.type} maxLength={column.maxLength}
                                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                                   value={`${formik.values[column.name]}`}
                                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        </div>))}
                    </div>
                }
                {typeform === 'packing' &&
                    <div className={"grid gap-2 grid-cols-2"}>
                        {map(columns_2, (column, index) => (<div key={index}>
                            <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}:</p>
                            <input type={column.type} maxLength={column.maxLength}
                                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                                   value={`${formik.values[column.name]}`}
                                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        </div>))}
                    </div>
                }


                <div className="w-full flex justify-center">
                    <button onClick={formik.handleSubmit} type="button"
                            className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </form>

        </div>
    );
};
const initialValues = (data) => {
    return {
        enabled_1_4: data?.enabled_1_4 || 0,
        enabled_1_8: data?.enabled_1_8 || 0,
        enabled_1_16: data?.enabled_1_16 || 0,
        enabled_rings: data?.enabled_rings || 0,
        rejected_ranch: data?.rejected_ranch || 0,
        crown: data?.crown || 0,
        shell: data?.shell || 0,
        trunk: data?.trunk || 0,
        juice_pulp: data?.juice_pulp || 0,
        pt_cut_1_8: data?.pt_cut_1_8 || 0,
        pt_cut_1_16: data?.pt_cut_1_16 || 0,
        pt_cut_rings: data?.pt_cut_rings || 0,
        pt_cut_recuperable: data?.pt_cut_recuperable || 0,
        lot_cut_1_8: data?.lot_cut_1_8 || '',
        lot_cut_1_16: data?.lot_cut_1_16 || '',
        lot_cut_rings: data?.lot_cut_rings || '',

        local: data?.local || 0,
        quality: data?.quality || 0,
    }
}
const newSchema = () => {
    return {
        enabled_1_4 : Yup.number().min(0).required(),
        enabled_1_8: Yup.number().min(0).required(),
        enabled_1_16: Yup.number().min(0).required(),
        enabled_rings: Yup.number().min(0).required(),
        rejected_ranch: Yup.number().min(0).required(),
        crown: Yup.number().min(0).required(),
        shell: Yup.number().min(0).required(),
        trunk: Yup.number().min(0).required(),
        juice_pulp: Yup.number().min(0).required(),
        pt_cut_1_8: Yup.number().min(0).required(),
        pt_cut_1_16: Yup.number().min(0).required(),
        pt_cut_rings: Yup.number().min(0).required(),
        pt_cut_recuperable: Yup.number().min(0).required(),
        lot_cut_1_8: Yup.string(),
        lot_cut_1_16: Yup.string(),
        lot_cut_rings: Yup.string(),
        local: Yup.number().min(0).required(),
        quality: Yup.number().min(0).required(),
    }
}
export default FormProcessPineapple;