import React from 'react';
import store, {Persistor} from "./store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import Error404 from "./containers/errors/Error404";

import Sidebar from "./components/navigation/Sidebar";
import Planning from "./containers/pages/Planning/Home";
import Production from "./containers/pages/Planning/Production";
import BuyOpen from "./containers/pages/Planning/Buy/Open";
import Material from "./containers/pages/Planning/Items/Material";
import Inventory from "./containers/pages/Planning/Stock";
import Settings from "./containers/pages/Planning/Settings";
import Categories from "./components/Planning/Settings/Categories";
import Condition from "./components/Planning/Settings/Condition";
import CostProduction from "./components/Planning/Settings/CostProduction";
import Currency from "./components/Planning/Settings/Currency";
import Cut from "./components/Planning/Settings/Cut";
import Family from "./components/Planning/Settings/Family";
import Location from "./components/Planning/Settings/Location";
import StorageArea from "./components/Planning/Settings/StorageArea";
import SubFamily from "./components/Planning/Settings/SubFamily";
import Tax from "./components/Planning/Settings/Tax";
import UnitMeasurement from "./components/Planning/Settings/UnitMeasurement";
import PackingItems from "./components/Planning/Settings/Packing";
import Suppliers from "./containers/pages/Planning/Contact/Suppliers";
import Customers from "./containers/pages/Planning/Contact/Customers";
import Outsourcing from "./containers/pages/Planning/Contact/Outsourcing";
import TransportBusiness from "./containers/pages/Planning/Contact/Transport";
import Products from "./containers/pages/Planning/Items/Products";
import BuyDone from "./containers/pages/Planning/Buy/Done";
import SellOpen from "./containers/pages/Planning/Sell/Open";
import SellDone from "./containers/pages/Planning/Sell/Done";
import Login from "./containers/auth/Login";
import ContactDetail from "./containers/pages/Planning/Contact/ContactDetail";
import Home from "./containers/Home";
import ChangePassword from "./containers/auth/Password";
import RawMaterial from "./containers/pages/Logistic/RawMaterial";
import Motions from "./containers/pages/Logistic/Motions";
import Stock from "./containers/pages/Logistic/Stock";
import Parcels from "./containers/pages/Collection/Parcels";
import Analysis from "./containers/pages/Quality/Analysis";
import Status from "./containers/pages/Quality/Status";
import Users from "./containers/pages/Settings/Users";
import Report from "./containers/pages/Operations/Report";
import Costs from "./containers/pages/Finances/Costs";
import Samples from "./containers/pages/Sales/Samples";
import Form from "./containers/pages/Sales/Form";
import Process from "./containers/pages/Production/Process";
import MOD from "./containers/pages/Production/MOD";


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


                        {/*Collection*/}
                        <Route path="collection/parcels" element={<Parcels/>}/>

                        {/*Quality Assurance*/}
                        <Route path="quality-assurance/analysis" element={<Analysis/>}/>
                        <Route path="quality-assurance/status" element={<Status/>}/>

                        {/*Settings*/}
                        <Route path="settings/users" element={<Users/>}/>


                        {/*Operations*/}
                        <Route exact path="operations/records/:category" element={<Report/>}/>
                        {/*Planning*/}
                        <Route exact path="/planning/" element={<Planning/>}/>
                        <Route exact path="/planning/sales" element={<SellOpen/>}/>
                        <Route exact path="/planning/sales/done" element={<SellDone/>}/>
                        <Route exact path="/planning/manufacturing" element={<Production/>}/>
                        <Route exact path="/planning/purchases" element={<BuyOpen/>}/>
                        <Route exact path="/planning/purchases/done" element={<BuyDone/>}/>
                        <Route exact path="/planning/inventory" element={<Inventory/>}/>
                        <Route exact path="/planning/products" element={<Products/>}/>
                        <Route exact path="/planning/materials" element={<Material/>}/>
                        <Route exact path="/planning/contacts/customers" element={<Customers/>}/>
                        <Route exact path="/planning/contacts/suppliers" element={<Suppliers/>}/>
                        <Route exact path="/planning/contacts/outsourcing" element={<Outsourcing/>}/>
                        <Route exact path="/planning/contacts/transport" element={<TransportBusiness/>}/>
                        <Route exact path="/planning/contacts/:path/:id" element={<ContactDetail/>}/>
                        <Route exact path="/planning/settings" element={<Settings/>}/>
                        <Route exact path="/planning/settings/categories" element={<Categories/>}/>
                        <Route exact path="/planning/settings/condition" element={<Condition/>}/>
                        <Route exact path="/planning/settings/cost-production" element={<CostProduction/>}/>
                        <Route exact path="/planning/settings/currency" element={<Currency/>}/>
                        <Route exact path="/planning/settings/cut" element={<Cut/>}/>
                        <Route exact path="/planning/settings/family" element={<Family/>}/>
                        <Route exact path="/planning/settings/location" element={<Location/>}/>
                        <Route exact path="/planning/settings/packing" element={<PackingItems/>}/>
                        <Route exact path="/planning/settings/storage-area" element={<StorageArea/>}/>
                        <Route exact path="/planning/settings/subfamily" element={<SubFamily/>}/>
                        <Route exact path="/planning/settings/tax" element={<Tax/>}/>
                        <Route exact path="/planning/settings/unit-of-measurement" element={<UnitMeasurement/>}/>

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