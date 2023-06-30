import React, {useEffect, useState} from 'react';
import Planning from "../Home";
import {useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";
import {get_customer, update_customer} from "../../../../redux/actions/management";
import {CloudArrowUpIcon} from "@heroicons/react/24/solid";

const ContactDetail = () => {
    const {path, id} = useParams();
    const dispatch = useDispatch();
    const payload = useSelector((state) => state.Management.contact);
    const loading = useSelector((state) => state.Management.loading);


    useEffect(() => {
        if (path === 'customers') dispatch(get_customer(id));
    }, []);

    const [formData, setFormData] = useState(null); // Inicializar con null

    useEffect(() => {
        if (payload) {
            setFormData(payload);
        }
    }, [payload]);

    const {display_name, ruc, address, email, business_name} = formData || {}; // Desestructurar formData solo si no es null
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(update_customer(id, formData));
    };


    return (<Planning>
        <div className={'p-2 flex h-[550px] '}>
            <div className={"bg-white w-full shadow-2xl"}>
                <div className={"flex justify-between"}>
                    <p className={"text-black p-2"}>{business_name}</p>
                    <CloudArrowUpIcon onClick={(e) => onSubmit(e)} className={"w-8 text-gray-400 cursor-pointer"}/>
                </div>

                <Skeleton height={5} highlightColor={!loading ? "#22C55E" : "#F1C40F"}/>
                <form>
                    <div className={"grid grid-cols-2 gap-4 p-8"}>
                        <div>
                            <label htmlFor="phone" className={"text-gray-800 text-xs"}>Razón social</label>
                            <input
                                name={'business_name'}
                                id={'business_name'}
                                disabled
                                value={business_name}
                                type="text"
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className={"text-gray-800 text-xs"}>Nombre</label>
                            <input
                                name={'display_name'}
                                id={'display_name'}
                                type="text"
                                required={true}
                                value={display_name}
                                autoComplete={'off'}
                                onChange={e => onChange(e)}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className={"text-gray-800 text-xs"}>RUC</label>
                            <input
                                name={'ruc'}
                                id={'ruc'}
                                type="number"
                                value={ruc}
                                autoComplete={'off'}
                                onChange={e => onChange(e)}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className={"text-gray-800 text-xs"}>Dirección</label>
                            <input
                                name={'address'}
                                id={'address'}
                                type="text"
                                value={address}
                                autoComplete={'off'}
                                onChange={e => onChange(e)}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className={"text-gray-800 text-xs"}>Correo</label>
                            <input
                                name={'email'}
                                id={'email'}
                                type="email"
                                value={email}
                                autoComplete={'off'}
                                onChange={e => onChange(e)}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </Planning>);
};

export default ContactDetail;
