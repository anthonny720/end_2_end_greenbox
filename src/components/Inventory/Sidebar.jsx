import React from 'react'
import generateRandomColor from "../util/colors";

const RandomColoredText = ({text}) => {
    const randomColor = generateRandomColor();
    const style = {
        backgroundColor: randomColor + '1A',
        color: randomColor,
        padding: '0.2rem 0.5rem',
        borderRadius: '0.5rem',
        textColor: 'black',
        overflow: 'hidden'
    };
    return <div style={style}
                className={"w-12 h-12 rounded-full  flex items-center justify-center rounded-full "}>
        <p>{text}</p></div>;
};

const Sidebar = ({data}) => {
    return (<div
            className={"flex justify-between flex-col p-4 text-black text-md font-semi-bold overflow-scroll scrollbar-hide max-h-96 bg-white rounded-2xl"}>
            <p>Pedidos pendientes</p>
            {data && data.map((item, index) => {
                return (<div className="flex items-center border-b border-gray-200 py-6" key={index}>
                    <RandomColoredText key={index} text={item?.product[0] + item?.product[1]}/>
                    <div className="flex items-start justify-between w-full">
                        <div className="pl-3 w-full">
                            <p className="lg:text-md text-sm font-normal leading-5 text-gray-800">{item?.fcl}</p>
                            <p className="text-sm leading-normal pt-2 text-gray-500">
                                <span className={"text-black"}>{item?.client + " " + item?.cut + ": "}</span>
                                {item?.stock} kg</p>
                        </div>
                    </div>
                </div>)
            })}

        </div>)
}

export default Sidebar