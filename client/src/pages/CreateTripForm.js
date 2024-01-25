import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function CreateTripForm({ setData }) {
  const [refreshPage, setRefreshPage] = useState(false);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch("/destinations")
      .then(response => response.json())
      .then(data => setDestinations(data))
      .catch(error => console.error(error));
  }, []);

  const formSchema = yup.object().shape({
    destination: yup.string().required("Must enter destination"),
    startDate: yup.date().required("Required"),
    endDate: yup
      .date()
      .required("Required")
      .min(yup.ref("startDate"), "End date should be later than start date"),
    occasion: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      destination: "",
      startDate: "",
      endDate: "",
      occasion: "",
    },
    validationSchema: formSchema,
    onSubmit: values => {
      fetch("/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(res => {
          if (res.status >= 200) {
            return res.json();
          } else {
            throw new Error("Failed to create trip");
          }
        })
        .then(trip => {
          setData(data => [...data, trip]);
          setRefreshPage(!refreshPage);

          // Reset the form
          formik.resetForm();
        })
        .catch(err => console.error(err));
    },
  });

  return (
    <div>
      <h1>Create Trip Form</h1>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="destination">Destination</label>
        <br />
        <select
          id="destination"
          name="destination"
          onChange={formik.handleChange}
          value={formik.values.destination}>
          {destinations.map(destination => (
            <option key={destination.id} value={destination.name}>
              {destination.name}
            </option>
          ))}
        </select>
        <p style={{ color: "red" }}> {formik.errors.destination}</p>

        <label htmlFor="startDate">Start Date</label>
        <br />
        <input
          id="startDate"
          name="startDate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.startDate}
        />
        <p style={{ color: "red" }}> {formik.errors.startDate}</p>

        <label htmlFor="endDate">End Date</label>
        <br />
        <input
          id="endDate"
          name="endDate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.endDate}
        />
        <p style={{ color: "red" }}> {formik.errors.endDate}</p>

        <label htmlFor="occasion">Occasion</label>
        <br />
        <input
          id="occasion"
          name="occasion"
          onChange={formik.handleChange}
          value={formik.values.occasion}
        />
        <p style={{ color: "red" }}> {formik.errors.occasion}</p>

        <button type="submit">Add Trip</button>
      </form>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>Destination</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Occasion</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CreateTripForm;
