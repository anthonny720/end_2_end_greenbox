import {map} from "lodash";
import Humanize from "humanize-plus";
const SummaryStock = ({family}) => {
    return (<div className={"flex flex-wrap pb-2 mx-4 md:mx-24 lg:mx-0 justify-center "}>
            {map(family, (f, index) => <div key={index} className="p-2 w-max lg:w-1/6 w-1/2">
                <div
                    className={`flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] hover:from-green-500 hover:to-lemon-900  rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
                    <h1 className="text-sm sm:text-sm xl:text-sm font-bold text-black  group-hover:font-bold  group-hover:text-white capitalize ">{f?.family}
                    </h1>
                    <div
                        className="flex flex-col mt-1 justify-center items-center group-hover:font-bold group-hover:text-white text-black">
                        <h1 className="text-left text-xs h6">{Humanize.formatNumber(f?.stock, 2)} kg</h1>
                    </div>

                </div>
            </div>)}


        </div>

    );
};

export default SummaryStock;