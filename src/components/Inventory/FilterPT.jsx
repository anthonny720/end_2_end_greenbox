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

        <div className="flex items-center justify-between">
            <p className="font-medium">
                Filtros
            </p>


        </div>

        <div>
            <div className="grid   lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-2  gap-4 flex-wrap">
                <input
                    placeholder={"Lote"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.lot}
                    onChange={text => formik.setFieldValue('lot', text.target.value)}/>
                <input
                    placeholder={"Producto"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.product}
                    onChange={text => formik.setFieldValue('product', text.target.value)}/>
                <input
                    placeholder={"Corte"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.cut}
                    onChange={text => formik.setFieldValue('cut', text.target.value)}/>

                <select value={formik.values.presentation}
                        onChange={(value) => formik.setFieldValue('presentation', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Presentación</option>
                    <option value={'Retail'}>Retail</option>
                    <option value={'Granel'}>Granel</option>
                </select>
                <select value={formik.values.certification}
                        onChange={(value) => formik.setFieldValue('certification', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Certificación</option>
                    <option value={'ORGANICO'}>Orgánico</option>
                    <option value={'CONVENCIONAL'}>Convencional</option>
                </select>
                <select value={formik.values.group}
                        onChange={(value) => formik.setFieldValue('group', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Grupo</option>
                    <option value={'EXPORTACION'}>Exportación</option>
                    <option value={'VENTA'}>Venta local</option>
                    <option value={'MUESTRAS'}>Muestras</option>
                    <option value={'CATEGORIA'}>Categoría C</option>
                </select>
                <input
                    placeholder={"FCL"}
                    className=" px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.fcl}
                    onChange={text => formik.setFieldValue('fcl', text.target.value)}/>
                <input
                    placeholder={"Cliente"}
                    className=" px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.client}
                    onChange={text => formik.setFieldValue('client', text.target.value)}/>
                <input
                    placeholder={"Destino"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.destines}
                    onChange={text => formik.setFieldValue('destines', text.target.value)}/>
                <input
                    placeholder={"Observaciones "}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.observations}
                    onChange={text => formik.setFieldValue('observations', text.target.value)}/>
            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        lot: '',
        presentation: '',
        certification: '',
        group: '',
        observations: '',
        product: '',
        cut: '',
        fcl: '',
        client: '',
        destines: ''
    }
}


export default Filter;
