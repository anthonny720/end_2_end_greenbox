import React, {useState} from 'react';
import Planning from "./Home";

const Inventory = () => {
    const [formData, setFormData] = useState({
        sap: '', name: ''
    })

    const {sap, name} = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})

    }
    return (<Planning>

            <div class="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
                <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="sap"
                                id="sap"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                value={sap}
                                onChange={e => onChange(e)}
                                placeholder="Codigo"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="name"
                                id="name"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                value={name}
                                onChange={e => onChange(e)}
                                placeholder="Nombre"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="category"
                                id="category"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Categoria"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="supplier"
                                id="supplier"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Proveedor"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="stock"
                                id="stock"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Stock"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="enable"
                                id="enable"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Disponible"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="booked"
                                id="booked"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Reservado"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="expected"
                                id="expected"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Esperado"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="um"
                                id="um"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="U.M."
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="avg_cost"
                                id="avg_cost"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Costo promedio"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="total_cosst"
                                id="total_cosst"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Costo total"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="lead_time"
                                id="lead_time"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Lead Time"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="safety_stock"
                                id="safety_stock"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="S.S."
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="reorder_point"
                                id="reorder_point"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="P.R."
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td><td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td><td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td><td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className={"flex gap-2"}>
                                <p>PIÑA  </p>
                            </div>
                        </td>




                    </tr>
                    </tbody>
                </table>
            </div>
        </Planning>

    );
};

export default Inventory;
