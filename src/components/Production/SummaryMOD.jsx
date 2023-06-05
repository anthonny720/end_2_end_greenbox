import {map} from "lodash";
import {useSelector} from "react-redux";
import Humanize from "humanize-plus";


const SummaryMOD = () => {
    const summary = useSelector(state => state.Production.summary_mod)

    return (<div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}>
            {map(summary, (item, index) => <div key={index} className="p-2 w-full ">
                <div
                    className={`flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] hover:from-green-500 hover:to-lemon-900  rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
                    <h1 className="text-sm sm:text-sm xl:text-sm font-bold text-black  group-hover:font-bold  group-hover:text-white capitalize ">{index}
                    </h1>
                    <div
                        className="flex flex-col mt-1 justify-center items-center group-hover:font-bold group-hover:text-white text-black">
                        <h1 className="text-left text-xs h6">{Humanize.formatNumber(item,2)}</h1>
                    </div>

                </div>
            </div>)}


        </div>

    );
};

export default SummaryMOD;