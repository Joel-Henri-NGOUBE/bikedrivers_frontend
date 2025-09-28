import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Signup/Signup";
import LogIn from "./Pages/Login/Login";
import Offers from "./Pages/Offers/Offers";
import Offer from "./Pages/Offer/Offer";
import AddOrSetOffer from "./Pages/AddOrSetOffer/AddOrSetOffer";
import Vehicles from "./Pages/Vehicles/Vehicles";
import Monitoring from "./Pages/Monitoring/Monitoring";
import Applications from "./Pages/Applications/Applications";
import Documents from "./Pages/Documents/Documents";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoutes";

function App() {
  return  <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<Offers />}/>
            <Route path="/offer/:id" element={<Offer />}/>
            <Route path="/monitoring" element={<Monitoring />}/>
             
            <Route element={<PrivateRoute />}>
              <Route path="/vehicles" element={<Vehicles />}/>
              <Route path="/offers" element={<AddOrSetOffer />}>
                <Route path="/offers/:id" element={<AddOrSetOffer />}/>
              </Route>
              <Route path="/applications" element={<Applications />}/>
              <Route path="/applications/:applicationId/documents" element={<Documents />}/>
            </Route>
              {/* <Route path="/vehicles/:id" element={<Vehicle />} /> */}
            {/* </Route> */}
            {/* <Route path="/applications" element={<Applications />}>
              <Route path="/applications/:id" element={<Application />}>
                <Route path="/applications/:id/documents/:id_document" element={<Documents />}/>
              </Route>
            </Route>
            <Route path="/applied_offers" element={<AppliedOffers />}>
              <Route path="/applied_offers/:id" element={<AppliedOffer />}>
                <Route path="/applied_offers/:id/documents/:id_document" element={<Documents />} />
              </Route>
            </Route> */}
            
    </Routes>;
}

export default App