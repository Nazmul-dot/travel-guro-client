import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import useAuth from "../../../useHooks/useAuth";
import SingleService from "../../servicees/SingleService";

const AllOrders = () => {
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

  const deleteService = (id) => {
    const confirm = window.confirm(
      "Are Youe sure that you want delete a item permanatly??"
    );
    if (confirm) {
      fetch(
        `https://arcane-river-87047.herokuapp.com/user/serviceDelet/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            const rest = services.filter((item) => item._id !== id);
            setServices(rest);
          }
        });
    }
  };
  return (
    <div>
      <Container>
        <div className="container-fluid">
          <h3 className="text-center mt-3 text-danger">oure serevices</h3>
          <hr className="w-25 mx-auto text-danger" style={{ height: "2px" }} />
          <h1
            className="display-4 text-center"
            style={{ letterSpacing: "6px" }}
          >
            MODIFY THE CARS
          </h1>
          {load ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="row">
              <div className="col-10 col-lg-9 mx-auto ">
                <div className="row">
                  {services.map((service) => (
                    <SingleService
                      key={service._id}
                      service={service}
                      admin={admin}
                      deleteService={deleteService}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllOrders;
