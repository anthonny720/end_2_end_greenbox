import React from 'react';
import {useFormik} from "formik";
import {get_lots} from "../../redux/actions/logistic";
import {useDispatch} from "react-redux";

const Filter = () => {
    const dispatch = useDispatch();

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            dispatch(get_lots(form))
        }
    })
    return (<form className="w-full  rounded-lg bg-white text-black" onChange={formik.handleSubmit}>
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2  gap-4 mt-4 p-2 ">
                <input
                    placeholder={"Lote"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.lot}
                    onChange={text => formik.setFieldValue('lot', text.target.value)}/>


                <input
                    placeholder={"Producto"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.product__name}
                    onChange={text => formik.setFieldValue('product__name', text.target.value)}/>


                <input
                    placeholder={"Condición"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.condition}
                    onChange={text => formik.setFieldValue('condition', text.target.value)}/>


                <input
                    placeholder={"Maquila"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.maquila__business_name}
                    onChange={text => formik.setFieldValue('maquila__business_name', text.target.value)}/>
            </div>
        </div>

    </form>);
};
const initialValues = () => {
    return {
        lot: '', product__name: '', maquila__business_name: '', condition: ''
    }
}

export default Filter;
