import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TripDetails from "./TripDetails";
import CreateTripForm from "./CreateTripForm";

function Trips() {
  const [data, setData] = useState([]);
  const [destinations, setDestinations] = useState([]); 
  const [filteredTrips, setFilteredTrips] = useState([]);

  // Retrieve the logged-in user's information (assuming it's stored in local storage)
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    fetch("/destinations")
      .then(response => response.json())
      .then(data => setDestinations(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (userId) {
      fetch("/trips")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(allTrips => {
          setData(allTrips);
          // Filter trips by the logged-in user's ID
          setFilteredTrips(allTrips.filter(trip => trip.userId === userId));
        })
        .catch(error => console.error("Fetch error:", error));
    }
  }, [userId]);


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

        <div>
    
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
                destinations={destinations}  //KLP 1/26/24
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
