import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// import AddService from "./components/addService.js/AddService";
import Confirm from "./components/confirm/Confirm";
import Contact from "./components/contact/Contact";
import Dashbord from "./components/dashbord/dashbord/Dashbord";
import Error from "./components/error/Error";
// import Footer from "./components/footer/Footer";

// import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
// import ManageService from "./components/dashbord/manageserevice/ManageService";
import MoreCar from "./components/moreCar/MoreCar";
// import MyOrdere from "./components/myorder/MyOrdere";
import PrivateProute from "./components/privateRoute/PrivateProute";
import Register from "./components/register/Register";
import PerService from "./components/servicees/perService/PerService";
import AuthProvider from "./context/authProvider/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <PrivateProute path="/perservice/:id">
              <PerService></PerService>
            </PrivateProute>

            {/* <PrivateProute path="/myorder">
              <MyOrdere></MyOrdere>
            </PrivateProute> */}

            {/* <PrivateProute path="/manageservice">
              <ManageService></ManageService>
            </PrivateProute> */}

            <Route path="/moreCar">
              <MoreCar></MoreCar>
            </Route>

            {/* <PrivateProute path="/addservice">
              <AddService></AddService>
            </PrivateProute> */}

            <PrivateProute path="/confirm">
              <Confirm></Confirm>
            </PrivateProute>

            {/* <PrivateProute path="/contact">
              <Contact></Contact>
            </PrivateProute> */}

            <PrivateProute path="/dashbord">
              <Dashbord></Dashbord>
            </PrivateProute>

            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
