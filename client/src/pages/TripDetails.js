import { useState } from "react";

function TripDetails({ trip, deleteTrip, updateTrip, data = [], setData }) {
  const [updatedTrip, setUpdatedTrip] = useState({
    ...trip,
    start_date: new Date(trip.start_date).toISOString().slice(0, 10),
    end_date: new Date(trip.end_date).toISOString().slice(0, 10),
  });
  console.log(updatedTrip);
  console.log("Trip object:", trip); // Check the trip object
  console.log("Updated trip state:", updatedTrip); // Check the state

  function handleDelete() {
    deleteTrip(trip.id);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    let parsedValue = value;

    // If the input is a date, parse it into a Date object
    if (["startDate", "endDate"].includes(name)) {
      parsedValue = new Date(value).toISOString().slice(0, 10);
    }

    setUpdatedTrip((prevTrip) => ({ ...prevTrip, [name]: parsedValue }));
  }

  function handleUpdate() {
    const updatedTripList = data.map((tri) => {
      if (updatedTrip.id === tri.id) {
        return updatedTrip;
      } else {
        return tri;
      }
    });
    setData(updatedTripList);
    updateTrip(updatedTrip);

  }

  return (
    <div>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>Occasion:</th>
            <td>{trip.occasion}</td>
          </tr>
          <tr>
            <th>Destination:</th>
            <td>{trip.destination}</td>
          </tr>
          <tr>
            <th>Start Date:</th>
            <td>{new Date(trip.start_date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>End Date:</th>
            <td>{new Date(trip.end_date).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>


      <div>
        <button className="button" onClick={handleDelete}>Delete Trip</button>
        <button className="button" onClick={handleUpdate}>Update Trip</button>
      </div>

      <div className="tripForm">
        <input
          type="text"
          name="occasion"
          value={updatedTrip.occasion}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="destination"
          value={updatedTrip.destination}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="start_date"
          value={updatedTrip.start_date}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="end_date"
          value={updatedTrip.end_date}
          onChange={handleInputChange}
        />
      <hr />
      </div>
    </div>
  );
}
export default TripDetails;

// Original Code ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// import { useState } from "react";

// function TripDetails({ trip, deleteTrip, updateTrip, data = [], setData }) {

//   trip.start_date = new Date(trip.start_date).toISOString().slice(0, 10);
//   trip.end_date = new Date(trip.end_date).toISOString().slice(0, 10);
//   const [updatedTrip, setUpdatedTrip] = useState(trip);
//   console.log(updatedTrip);
//   function handleDelete() {
//     deleteTrip(trip.id);
//   }

//   function handleInputChange(event) {
//     const { name, value } = event.target;
//     let parsedValue = value;

//     // If the input is a date, parse it into a Date object
//     if (["startDate", "endDate"].includes(name)) {
//       parsedValue = new Date(value);
//     }

//     setUpdatedTrip(prevTrip => ({ ...prevTrip, [name]: parsedValue }));
//   }

//   function handleUpdate() {
//     const updatedTripList = data.map(tri => {
//       if (updatedTrip.id === tri.id) {
//         return updatedTrip;
//       } else {
//         return tri;
//       }
//     });
//     setData(updatedTripList);
//     updateTrip(updatedTrip);
//   }

//   return (
//     <div>
//       <h2>{trip.occasion}</h2>
//       <h2>{trip.destination}</h2>
//       <p>Start Date: {new Date(trip.start_date).toLocaleDateString()}</p>
//       <p>End Date: {new Date(trip.end_date).toLocaleDateString()}</p>
//       <hr />
//       <button onClick={handleDelete}>Delete Trip</button>
//       <button onClick={handleUpdate}>Update Trip</button>
//       <input
//         type="text"
//         name="occasion"
//         value={updatedTrip.occasion}
//         onChange={handleInputChange}
//       />
//       <input
//         type="date"
//         name="start_date"
//         value={updatedTrip.start_date}
//         onChange={handleInputChange}
//       />
//       <input
//         type="date"
//         name="end_date"
//         value={updatedTrip.end_date}
//         onChange={handleInputChange}
//       />
//     </div>
//   );
// }

// export default TripDetails;
