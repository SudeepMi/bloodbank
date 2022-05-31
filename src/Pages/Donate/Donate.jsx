import React from "react";
import User from "../../utils/User";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import "./style.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import Api from "../../utils/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DonorProfile from "../../components/DonorProfile/DonorProfile";
import EventCard from "../../components/AboutDonation/EventCard";

function Donate() {
  const user = User().user;
  const [Requests, setRequests] = React.useState([]);
  const [Events, setEvents] = React.useState([]);

  React.useEffect(() => {
    document.title = "Blood Bank | Blood Donation";
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

//   const handleSubmit = () => {
//     setLoading(true);
//     const intToast = toast.loading("Saving....");
//     Api.post("/requests", values)
//       .then((res) => {
//         if (res.status === 201) {
//           setLoading(false);
//           toast.dismiss(intToast);
//           toast.success("Successfully saved", {
//             closeButton: false,
//           });
//           history("/dashboard");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  React.useEffect(() => {
    Api.get("/events?limit=4")
      .then((res) => {
        if (res.status === 200) {
          setEvents(res.data.event);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const history = useNavigate();

  const [loading, setLoading] = React.useState(false);

  return (
    <div className="container">
      {loading ? <p>loading..</p> : null}
      <div className="row text-center profile_set__header">
        <h4 className="text-danger"> Donate Blood and Save Lives </h4>
      </div>
      <div className="row">
        <div className="col-md-12 mt-3">
          <h5 className="">Active and Incoming Events</h5><hr />
        </div>
        <div className="col-md-12">
          <div className="row">
            {Events.map((event, index) => {
              return <EventCard key={index} event={event} />;
            })}
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <h5 className="">Recent Blood Requests</h5><hr />
        </div>
        
      </div>
    </div>
  );
}

export default Donate;
