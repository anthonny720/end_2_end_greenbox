import React from 'react';
import {UserCircleIcon} from "@heroicons/react/24/solid";

const Profile = ({data}) => {
    return (<div className=" font-sans h-screen w-full flex flex-row justify-center items-center">
        <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">

            {data?.image ? <img src={"https://greenbox.pe/wp-content/themes/greenbox/img/homeFoods2-sello-de.png"}
                                className="w-32 h-32 mx-auto rounded-full bg-white -mt-20 border-8 border-white"
                                alt={""}/> :
                <UserCircleIcon className="w-32 h-32 mx-auto rounded-full bg-white -mt-20 border-8 border-white"/>}

            <div className="text-center mt-2 text-3xl font-medium ">{data?.business_name}
                <p className="text-center font-light text-xs">{data?.ruc}</p>
            </div>
            <div className="text-center font-light text-sm">{data?.email}</div>
            <div className="text-center font-normal text-lg">{data?.contact} (Representante)</div>
            <div className="px-6 text-center mt-2 font-light text-sm">
                <p>
                    {data?.description}
                </p>
                <p className={"mt-4 text-xs"}>
                    {data?.address}
                </p>
            </div>
            <hr className="mt-8"/>
            <div className="flex p-4">
                <div className="w-1/2 text-center">
                    <span className="font-bold">{data?.city} - {data?.country}</span>
                </div>
                <div className="w-0 border border-gray-300">

                </div>
                <div className="w-1/2 text-center">
                    <span className="font-bold">{data?.phone}</span>
                </div>
            </div>

        </div>
    </div>);
};

export default Profile;
