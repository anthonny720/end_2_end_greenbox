import React from 'react';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";

const Filter = ({action}) => {
    const dispatch = useDispatch()
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true,

        onSubmit: (form) => {
            dispatch(action(form))
        }
    })
    return (<form className="w-full  rounded-lg bg-white text-black" onChange={formik.handleSubmit}>

        <div className="flex items-center justify-between mt-4">
            <p className="font-medium">
                Filtros
            </p>


        </div>

        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-4 mt-4">
                <input
                    placeholder={"Descripción"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.description}
                    onChange={text => formik.setFieldValue('description', text.target.value)}/>

                <select value={formik.values.category}
                        onChange={(value) => formik.setFieldValue('category', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Todos los categorías</option>
                    <option value={'Envase'}>Envase</option>
                    <option value={'Embalaje'}>Embalaje</option>
                    <option value={'Empaque'}>Empaque</option>
                    <option value={'Etiqueta'}>Etiqueta</option>

                </select>
                <select value={formik.values.status}
                        onChange={(value) => formik.setFieldValue('status', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Todas los status</option>
                    <option value={'OK'}>Ok</option>
                    <option value={'AGOTADA'}>Agotado</option>
                    <option value={'MENOR'}>Menor al mínimo</option>


                </select>
            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        description: "", category: "", status: ""
    }
}


export default Filter;
