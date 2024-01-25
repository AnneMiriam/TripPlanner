import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import TripDetails from "./TripDetails";
import CreateTripForm from "./CreateTripForm";

function Trips() {
  const [data, setData] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch("/destinations")
      .then(response => response.json())
      .then(data => setDestinations(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch("/trips")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error =>
        console.log(
          "There has been a problem with your fetch operation: ",
          error,
        ),
      );
  }, []);

  function updateTrip(updatedTrip) {
    fetch(`/trips/${updatedTrip.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrip),
    })
      .then(res => res.json())
      .then(updatedTrip => {
        setData(
          data.map(trip => (trip.id === updatedTrip.id ? updatedTrip : trip)),
        );
      })
      .catch(error => console.log("Error:", error));
  }

  function deleteTrip(id) {
    fetch(`/trips/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Remove the trip from the local state
        setData(data.filter(trip => trip.id !== id));
      })
      .catch(error =>
        console.log(
          "There has been a problem with your fetch operation: ",
          error,
        ),
      );
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {/* <h1>Please Login to see your Trips!</h1> */}
        <div>
          {/* <h3>Recent User Trips</h3> */}
          <p>
            {/* <strong>Marie578:</strong> Dallas, USA <br></br> */}
            {/* <em>Dates:</em> October 2024 <br></br> */}
            {/* <em>Occasion:</em> Wedding */}
          </p>
          <div>
            <CreateTripForm
              trips={data}
              setData={setData}
              destinations={destinations}
            />
            {data.map(trip => (
              <TripDetails
                key={trip.id}
                trip={trip}
                deleteTrip={deleteTrip}
                updateTrip={updateTrip}
                data={data}
                setData={setData}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Trips;
