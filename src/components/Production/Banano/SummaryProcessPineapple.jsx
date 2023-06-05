import {useSelector} from "react-redux";
import {sumBy} from "lodash";
import Humanize from "humanize-plus";

const SummaryPineapple = () => {
    const data = useSelector(state => state.Production.process)

    const total_pt = sumBy(data, item => Number(item.total_pt));
    const total_enabled = sumBy(data, item => Number(item.enabled_kg));
    const total_process = sumBy(data, item => Number(item.paid_kg));
    const stock = sumBy(data, item => Number(item.stock));
    const paid_kg = sumBy(data, item => Number(item.paid_kg));
    const pt_cut_1_8 = sumBy(data, item => Number(item.pt_cut_1_8));
    const pt_cut_1_16 = sumBy(data, item => Number(item.pt_cut_1_16));
    const pt_cut_rings = sumBy(data, item => Number(item.pt_cut_rings));
    const enabled_1_8 = sumBy(data, item => Number(item.enabled_1_8));
    const enabled_1_16 = sumBy(data, item => Number(item.enabled_1_16));
    const enabled_rings = sumBy(data, item => Number(item.enabled_rings));

    return (<div>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex-wrap items-center"}>
                <div className="p-2 w-full ">
                    <div
                        className={`flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] hover:from-green-500 hover:to-lemon-900  rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
                        <h1 className="text-sm sm:text-sm xl:text-sm font-bold text-black  group-hover:font-bold  group-hover:text-white capitalize ">Kg
                            Procesados
                        </h1>
                        <div
                            className="flex flex-col mt-1 justify-center items-center group-hover:font-bold group-hover:text-white text-black">
                            <h1 className="text-left text-xs h6">{Humanize.formatNumber(total_process, 2)} kg</h1>

                        </div>

                    </div>
                </div>
                <div className={"p-2 w-full "}>
                    <div
                        className={`flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] hover:from-green-500 hover:to-lemon-900  rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
                        <h1 className="text-sm sm:text-sm xl:text-sm font-bold text-black  group-hover:font-bold  group-hover:text-white capitalize ">Kg
                            PT
                        </h1>
                        <div
                            className="flex flex-col mt-1 justify-center items-center group-hover:font-bold group-hover:text-white text-black">
                            <h1 className="text-left text-xs h6">{total_pt} kg</h1>
                        </div>

                    </div>
                </div>
                <div className={"p-2 w-full "}>
                    <div
                        className={`flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] hover:from-green-500 hover:to-lemon-900  rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
                        <h1 className="text-sm sm:text-sm xl:text-sm font-bold text-black  group-hover:font-bold  group-hover:text-white capitalize ">Rendimiento
                        </h1>
                        <div
                            className="flex flex-col mt-1 justify-center items-center group-hover:font-bold group-hover:text-white text-black">
                            <h1 className="text-left text-xs h6">Neto: {Humanize.formatNumber((total_pt / stock) * 100, 2)} %</h1>
                            <h1 className="text-left text-xs h6">Pagado: {Humanize.formatNumber((total_pt / paid_kg) * 100, 2)} %</h1>
                        </div>

                    </div>
                </div>
                <div className={"p-2 w-full "}>
                    <div
                        className={`flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] hover:from-green-500 hover:to-lemon-900  rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
                        <h1 className="text-sm sm:text-sm xl:text-sm font-bold text-black  group-hover:font-bold  group-hover:text-white capitalize ">Kg
                            Cortes
                        </h1>
                        <div
                            className="flex flex-col mt-1 justify-center items-center group-hover:font-bold group-hover:text-white text-black">
                            <h1 className="text-left text-xs h6">1/8: {pt_cut_1_8} kg</h1>
                            <h1 className="text-left text-xs h6">1/16: {pt_cut_1_16} kg</h1>
                            <h1 className="text-left text-xs h6">Rings: {pt_cut_rings} kg</h1>
                        </div>

                    </div>
                </div>

            </div>
            <div className={" flex justify-center items-center w-full flex-wrap gap-2"}>
                <span
                    class="bg-gray-300 text-black bg-opacity-30 text-xs font-medium mr-2 px-2.5 py-0.5 rounded w-max "><span
                    className={"font-bold"}>Participación 1/8:
                </span> {Humanize.formatNumber((enabled_1_8 / total_enabled) * 100, 2)} %</span>
                <span
                    class="bg-gray-300 text-black bg-opacity-30 text-xs font-medium mr-2 px-2.5 py-0.5 rounded w-max "><span
                    className={"font-bold"}>Participación 1/16: </span> {Humanize.formatNumber((enabled_1_16 / total_enabled) * 100, 2)} %</span>
                <span
                    class="bg-gray-300 text-black bg-opacity-30 text-xs font-medium mr-2 px-2.5 py-0.5 rounded w-max "><span
                    className={"font-bold"}>Participación Rings: </span> {Humanize.formatNumber((enabled_rings / total_enabled) * 100, 2)} %</span>

            </div>


        </div>


    );
};

export default SummaryPineapple;