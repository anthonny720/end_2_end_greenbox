import React, {Fragment, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {Listbox, Switch, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import * as Yup from "yup";
import {useFormik} from "formik";
import {update_status} from "../../redux/actions/quality";

const DestineChoices = [{value: 'P', label: 'Perú'}, {value: 'E', label: 'EEUU'}, {
    value: 'C', label: 'Canadá'
}, {value: 'U', label: 'Europa'}, {value: 'S', label: 'Suiza'},];
const FormStatus = ({close, data, dispatch, params}) => {

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.destine = selectedDestines.map((d) => d.value)
            dispatch(update_status(form, data?.id, params))
            close()
        }
    })

    const [selectedDestines, setSelectedDestines] = useState(data ? data.destine.map((d) => DestineChoices.find((dc) => dc.value === d)) : []);

    const handleSelectedDestinesChange = (value) => {
        setSelectedDestines(value);
    };


    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4 gap-2">
            <div className={"w-full "}>
                <p className={`${formik.errors.status && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 `}>Estado:</p>
                <select value={formik.values.status}
                        onChange={(value) => formik.setFieldValue('status', value.target.value)}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm">
                    <option value={"O"}>Observado</option>
                    <option value={"P"}>Pendiente</option>
                    <option value={"R"}>Liberado</option>
                    <option value={"E"}>Rechazado</option>
                </select>
            </div>
            <div>
                <p className={`${formik.errors.pt_list && "text-red-500"} mt-2 text-[10px]  font-extralight leading-none text-blue-400`}>Producto terminado:</p>
                <input  maxLength={100} type={"text"}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                          value={`${formik.values.pt_list}`}
                          onChange={text => formik.setFieldValue('pt_list', text.target.value)}/>
            </div>
            <div>
                <p className={`${formik.errors.lot_client && "text-red-500"} mt-2 text-[10px]  font-extralight leading-none text-blue-400`}>Lote cliente:</p>
                <input maxLength={50} type={"text"}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                          value={`${formik.values.lot_client}`}
                          onChange={text => formik.setFieldValue('lot_client', text.target.value)}/>
            </div>
            <div className={"grid grid-cols-3 w-full mt-2"}>

                <div className={"w-full flex flex-col justify-center items-center"}>
                    <p className={`${formik.errors.microbiological_analysis && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Microbiología:</p>
                    <Switch
                        checked={formik.values.microbiological_analysis}
                        onChange={value => formik.setFieldValue('microbiological_analysis', value)}
                        className={`${formik.values.microbiological_analysis ? 'bg-blue-600' : 'bg-gray-200'} mt-2 relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                    <span
                        className={`${formik.values.microbiological_analysis ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                    </Switch>
                </div>
                <div className={"w-full flex flex-col justify-center items-center"}>
                    <p className={`${formik.errors.fosetyl && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Fosetyl:</p>
                    <Switch
                        checked={formik.values.fosetyl}
                        onChange={value => formik.setFieldValue('fosetyl', value)}
                        className={`${formik.values.fosetyl ? 'bg-blue-600' : 'bg-gray-200'} mt-2 relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                    <span
                        className={`${formik.values.fosetyl ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                    </Switch>
                </div>
                <div className={"w-full flex flex-col justify-center items-center"}>
                    <p className={`${formik.errors.pesticide && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Pesticidas:</p>
                    <Switch
                        checked={formik.values.pesticide}
                        onChange={value => formik.setFieldValue('pesticide', value)}
                        className={`${formik.values.pesticide ? 'bg-blue-600' : 'bg-gray-200'} mt-2 relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                    <span
                        className={`${formik.values.pesticide ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                    </Switch>
                </div>

            </div>


            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 mt-2 `}>Destino:</p>
                <Listbox value={selectedDestines} multiple onChange={handleSelectedDestinesChange}>
                    <div className="relative mt-1">
                        <Listbox.Button
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                        >
                      <span className="block truncate text-black whitespace-pre-wrap">
                        {selectedDestines.map((d) => d.label).join(", ")}
                      </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                      </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                                {DestineChoices.map((destine, destineIdx) => (<Listbox.Option
                                    key={destineIdx}
                                    className={({active}) => `relative z-50 bg-white cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-blue-200 text-blue-900" : "text-gray-900"}`}
                                    value={destine}
                                >
                                    {({selected}) => (<>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {destine.label}
                    </span>
                                        {selected ? (<span
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>) : null}
                                    </>)}
                                </Listbox.Option>))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>

            <div>
                <p className={`${formik.errors.observations && "text-red-500"} mt-2 text-[10px]  font-extralight leading-none text-blue-400`}>Observaciones:</p>
                <textarea maxLength={50}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                          value={`${formik.values.observations}`}
                          onChange={text => formik.setFieldValue('observations', text.target.value)}/>
            </div>


            <div className="w-full flex justify-center">
                <button type="button" onClick={() => formik.handleSubmit()}
                        className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>


        </form>

    </div>);
};

const initialValues = (data) => {
    return {
        observations: data?.observations || '',
        status: data?.status || 'O',
        microbiological_analysis: data?.microbiological_analysis || false,
        fosetyl: data?.fosetyl || false,
        pesticide: data?.pesticide || false,
        pt_list: data?.pt_list || '',
        lot_client: data?.lot_client || '',
    }

}
const newSchema = () => {
    return {
        observations: Yup.string(),
        status: Yup.string().required(),
        microbiological_analysis: Yup.boolean().required(),
        fosetyl: Yup.boolean().required(),
        pesticide: Yup.boolean().required(),
        pt_list: Yup.string(),
        lot_client: Yup.string(),
    }
}
export default FormStatus;

