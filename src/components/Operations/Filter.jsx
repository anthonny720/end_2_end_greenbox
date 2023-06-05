import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {enGB} from "date-fns/locale";
import {DateRangePicker} from "react-nice-dates";
import {map} from "lodash";
import {DownloadTableExcel} from "react-export-table-to-excel";

const Filter = ({providers, action, category, setParams, reference}) => {
    const loader = useSelector(state => state.Operations.loading);

    const dispatch = useDispatch()
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            setParams(form)
            dispatch(action(category, form))
        }
    })
    return (<form className="w-full  rounded-lg bg-white text-black z-20">

        <div className="flex items-center justify-between mt-4">
            <p className="font-medium">
                Filtros
            </p>

            <div className={"flex  items-center md:gap-2"}>
                <DownloadTableExcel
                    filename={`Reporte ${category}`}
                    sheet="Reporte"
                    currentTableRef={reference}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="icon cursor-pointer icon-tabler icon-tabler-edit text-black" width={20}
                         height={20}
                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                    </svg>

                </DownloadTableExcel>

                <button onClick={formik.handleSubmit} type={'button'}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md flex justify-center items-center">
                    {loader ? <svg className="animate-spin  h-5 w-5 text-black"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg> : 'Buscar'}
                </button>
            </div>


        </div>

        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">

                <select value={formik.values.provider}
                        onChange={(value) => formik.setFieldValue('provider', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Todos los proveedores</option>
                    {providers && map(providers, (provider, index) => {
                        return <option key={index} value={provider.id}>{provider.business_name}</option>
                    })}
                </select>
                <DateRangePicker
                    startDate={formik.values.start_date}
                    endDate={formik.values.end_date}
                    onStartDateChange={date => formik.setFieldValue('start_date', date)}
                    onEndDateChange={date => formik.setFieldValue('end_date', date)}
                    minimumLength={1}
                    format='yyyy-MM-dd'
                    locale={enGB}

                >
                    {({startDateInputProps, endDateInputProps, focus}) => (<div
                        className='date-range text-gray-400 w-full md:w-max rounded-lg flex  space-x-1 items-center lg:flex-row flex-col space-y-1  '>
                        <input
                            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-black"
                            {...startDateInputProps}
                            placeholder='Fecha de inicio'
                        />
                        <span className='date-range_arrow'/>
                        <input
                            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-black"
                            {...endDateInputProps}
                            placeholder='Fecha de fin'
                        />
                    </div>)}
                </DateRangePicker>
            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        start_date: "", end_date: "", provider: ""
    }
}


export default Filter;
