import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {update_kpi} from "../../../redux/actions/operations";


const FormUpdateKPI = ({data, close, category, params}) => {
    const columns = [
        {name: 'projected_kg', title: 'Proy. ingreso', type: 'text', maxLength: 7},
        {name: 'price_objective', title: 'Precio objetivo', type: 'text', maxLength: 4},
    ]

    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(update_kpi(category, data.id, form, params))
            close()
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

        <div className={`grid grid-cols-2 gap-2`}>
            {

                map(columns, (column, index) => (
                    <div key={index}>
                        <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}:</p>
                        <input type={column.type} maxLength={column.maxLength}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    </div>))

            }
        </div>


        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>)

};


const initialValues = (data) => {
    return {
        projected_kg: data?.projected_kg || 0,

        price_objective: data?.price_objective || 1.57,

    }
}
const newSchema = () => {
    return {
        projected_kg: Yup.number().min(0).required(true),

        price_objective: Yup.number().min(0).required(true),
    }
}

export default FormUpdateKPI;
