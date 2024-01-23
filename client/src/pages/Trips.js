import NavBar from "../components/NavBar";

function Trips() {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <main>
          <h1>Please Login to see your Trips!</h1>
          <div>
            <h3>Recent User Trips</h3>
            <p>
              <strong>Marie578:</strong> Dallas, USA <br></br>
              <em>Dates:</em>  October 2024  <br></br>
              <em>Occasion:</em> Wedding
            </p>
            {/* <p>
            {user.name}: {destination.city}, {destination.country}  
            Dates: {trip.start_date.month + trip.start_date.year}  
            Occasion: {trip.occasion}
            </p> */}
        </div>
        </main>
      </>
    );
  };
  
  export default Trips;