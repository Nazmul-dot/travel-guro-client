import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import useAuth from "../../useHooks/useAuth";
import SingleService from "./SingleService";
const Srevice = () => {
  const [services, setServices] = useState([]);
  const [load, setload] = useState(true);
  const { admin } = useAuth();
  useEffect(() => {
    fetch("https://arcane-river-87047.herokuapp.com/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setload(false);
        // console.log(data);
      });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <h3 className="text-center mt-3 text-primary">Oure Serevices</h3>
        <hr className="w-25 mx-auto text-danger" style={{ height: "2px" }} />
        <h1 className="display-4 text-center" style={{ letterSpacing: "6px" }}>
          POPULAR CARS
        </h1>
        {load ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="row">
            <div className="col-10 col-lg-9 mx-auto ">
              <div className="row">
                {services.slice(0, 6).map((service) => (
                  <SingleService
                    key={service._id}
                    service={service}
                    admin={false}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Srevice;
