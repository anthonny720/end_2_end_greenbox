import React from 'react';
import {filter} from "lodash";

const SummaryStatus = ({data}) => {
    return (<div className="flex  pb-3 p-4 justify-center gap-2 w-full flex-row flex-wrap">
        <div
            className="  lg:w-1/3  w-full sm:w-5/12  rounded-sm shadow-lg bg-white overflow-scroll scrollbar-hide">
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center justify-between px-4 py-4">
                    <div className="flex mr-4">
                            <span
                                className="items-center px-4 py-4 m-auto bg-orange-200 rounded-full hover:bg-orange-300 flex justify-center">
                              <h1 className={"text-orange-500 hover:text-orange-600 h-6 w-6 text-xl  lg:w-8 lg:h-8 text-center lg:text-2xl"}>
                                  O
                              </h1>
                            </span>
                    </div>
                    <div className="flex-1 pl-1">
                        <div className="text-xl font-medium text-gray-600 w-max">{filter(data, {status: 'O'})?.length}
                            <div className="h-2 bg-orange-500 rounded-md hover:bg-orange-600 w-full"></div>
                        </div>

                        <div className="text-xs text-gray-400 sm:text-base md:text-xs lg:text-base">
                            Observado
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            className="  lg:w-1/3    w-full sm:w-5/12  rounded-sm shadow-lg bg-white overflow-scroll scrollbar-hide">
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center justify-between px-4 py-4">
                    <div className="flex mr-4">
                            <span
                                className="items-center px-4 py-4 m-auto bg-yellow-200 rounded-full hover:bg-yellow-300 flex justify-center">
                              <h1 className={"text-yellow-500 hover:text-yellow-600 h-6 w-6 text-xl  lg:w-8 lg:h-8 text-center lg:text-2xl"}>P</h1>
                            </span>
                    </div>
                    <div className="flex-1 pl-1">
                        <div className="text-xl font-medium text-gray-600 w-max">
                            {filter(data, {status: 'P'})?.length}
                            <div className="h-2 bg-yellow-500 rounded-md hover:bg-yellow-600 w-full"></div>
                        </div>

                        <div className="text-xs text-gray-400 sm:text-base md:text-xs lg:text-base">
                            Pendiente
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            className="  lg:w-1/3    w-full sm:w-5/12  rounded-sm shadow-lg bg-white overflow-scroll scrollbar-hide">
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center justify-between px-4 py-4">
                    <div className="flex mr-4">
                            <span
                                className="items-center px-4 py-4 m-auto bg-green-200 rounded-full hover:bg-green-300 flex justify-center">
                              <h1 className={"text-green-500 hover:text-green-600 h-6 w-6 text-xl  lg:w-8 lg:h-8 text-center lg:text-2xl"}>L</h1>
                            </span>
                    </div>
                    <div className="flex-1 pl-1">
                        <div className="text-xl font-medium text-gray-600 w-max">
                                                        {filter(data, {status: 'R'})?.length}

                            <div className="h-2 bg-green-500 rounded-md hover:bg-green-600 w-full"></div>
                        </div>

                        <div className="text-xs text-gray-400 sm:text-base md:text-xs lg:text-base">
                            Liberado
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            className="  lg:w-1/3    w-full sm:w-5/12  rounded-sm shadow-lg bg-white overflow-scroll scrollbar-hide">
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center justify-between px-4 py-4">
                    <div className="flex mr-4">
                            <span
                                className="items-center px-4 py-4 m-auto bg-red-200 rounded-full hover:bg-red-300 flex justify-center">
                              <h1 className={"text-red-500 hover:text-red-600 h-6 w-6 text-xl  lg:w-8 lg:h-8 text-center lg:text-2xl"}>R</h1>
                            </span>
                    </div>
                    <div className="flex-1 pl-1">
                        <div className="text-xl font-medium text-gray-600 w-max">
                                                        {filter(data, {status: 'R'})?.length}

                            <div className="h-2 bg-red-500 rounded-md hover:bg-red-600 w-full"></div>
                        </div>

                        <div className="text-xs text-gray-400 sm:text-base md:text-xs lg:text-base">
                            Rechazado
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default SummaryStatus;
