import React from 'react';
import store, {Persistor} from "./store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";
import Login from "./containers/auth/Login";
import './styles/index.css';
import RawMaterial from "./containers/pages/Logistic/RawMaterial";
import Clients from "./containers/pages/Management/Clients";
import Packing from "./containers/pages/Management/Packing";
import Maquila from "./containers/pages/Management/Maquila";
import Transport from "./containers/pages/Management/Transport";
import Sidebar from "./components/navigation/Sidebar";
import Providers from "./containers/pages/Collection/Providers";
import Parcels from "./containers/pages/Collection/Parcels";
import Analysis from "./containers/pages/Quality/Analysis";
import Motions from "./containers/pages/Logistic/Motions";
import Stock from "./containers/pages/Logistic/Stock";
import Users from "./containers/pages/Settings/Users";
import Samples from "./containers/pages/Sales/Samples";
import Form from "./containers/pages/Sales/Form";
import Status from "./containers/pages/Quality/Status";
import Report from "./containers/pages/Operations/Report";

import MOD from "./containers/pages/Production/MOD";
import Process from "./containers/pages/Production/Process";
import ChangePassword from "./containers/auth/Password";
import Costs from "./containers/pages/Finances/Costs";
import KPI from "./containers/pages/Operations/KPI";


const App = () => {

    return (<Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>

            <Router>
                <section className="flex flex-row items-start  max-h-screen ">
                    <Sidebar/>
                    <Routes>
                        {/*Error Display*/}
                        <Route path="*" element={<Error404/>}/>
                        <Route exact path="/" element={<Home/>}/>


                        {/*Authentication*/}
                        <Route path="signin/" element={<Login/>}/>
                        <Route path="change-password/" element={<ChangePassword/>}/>

                        {/* Logistic */}
                        <Route path="logistic/:lot" element={<RawMaterial/>}/>
                        <Route path="logistic/motion" element={<Motions/>}/>
                        <Route path="logistic/stock" element={<Stock/>}/>

                        {/*Management*/}
                        <Route path="management/clients" element={<Clients/>}/>
                        <Route path="management/packing" element={<Packing/>}/>
                        <Route path="management/maquila" element={<Maquila/>}/>
                        <Route path="management/transport" element={<Transport/>}/>

                        {/*Collection*/}
                        <Route path="collection/providers" element={<Providers/>}/>
                        <Route path="collection/parcels" element={<Parcels/>}/>

                        {/*Quality Assurance*/}
                        <Route path="quality-assurance/analysis" element={<Analysis/>}/>
                        <Route path="quality-assurance/status" element={<Status/>}/>

                        {/*Settings*/}
                        <Route path="settings/users" element={<Users/>}/>


                        {/*Operations*/}
                        <Route exact path="operations/records/:category" element={<Report/>}/>
                        <Route exact path="operations/kpi" element={<KPI/>}/>

                        {/*Finance*/}
                        <Route exact path="finance/costs" element={<Costs/>}/>

                        {/*Sales*/}
                        <Route path="sales/samples" element={<Samples/>}/>
                        <Route path="sales/samples/form" element={<Form/>}/>

                        {/*Production*/}
                        <Route path="production/process" element={<Process/>}/>
                        <Route path="production/mod" element={<MOD/>}/>

                    </Routes>
                </section>
            </Router>
        </PersistGate>

    </Provider>);
}

export default App;