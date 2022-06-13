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
import { Avatar, Button } from "@mui/material";
import Api from "../../utils/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DonorProfile from "../../components/DonorProfile/DonorProfile";
import EventCard from "../../components/AboutDonation/EventCard";
import axios from "axios";
import calculateDistance from "../../utils/Distance";

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

      Api.get("/requests?limit=6")
      .then((res) => {
        if (res.status === 200) {
          setRequests(res.data.event);
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
        <div className="col-md-12">
          <div className="row">
          {Requests &&
                Requests.map((request, index) => (
                  request.status!=="completed" && <div className="col-lg-4 col-md-6" key={index}>
                    <RequestCard request={request} />
                    </div>
                    ))}
                    
          </div>
        </div>
        
      </div>
    </div>
  );
}

const RequestCard = ({request}) => {
    const [distance, setDistance] = React.useState(0);
  const navigate = useNavigate();
  const userLocation = localStorage.getItem("location");
  
    React.useEffect(() => {
      const eventLocation = request.location.split(",")[1];
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${eventLocation},NP&limit=5&appid=11f57469ba8b443f310f5ff160502490`
        )
        .then((res) => {
           if(res.data.length>0){
          const eLocation = `${res.data[0].lon},${res.data[0].lat}`;
          setDistance(calculateDistance(userLocation, eLocation));
           }
        });
    }, []);

    const handleClick = () => {
      const recipent = request.userid;
      Api.post("/chat/room", {
        recipent,
      })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.room);
            const room = res.data.room.roomname;
            navigate(`/chat/${room}`, { state: { request } });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return(
        <div className="border p-2 requestCard mt-3" style={{minHeight:"150px"}}>
           <p className="distance__v2">{distance}KM Away</p> 
        <span>Blood Group: {request.blood_group}</span>
        <span>Location : {request.location}</span>
        <span>Date : {new Date(request.createdAt).toDateString()}</span>
        <hr/>
        <div className="d-flex justify-content-between align-items-center">
            <Avatar />
           <span className="flex-fill ml-2">{request.userid.username}</span> 
            <span className="text-small">{request.userid.status!=="online" ? 
             <span className="text-danger">
             <i className="fa fa-circle"></i> Away
            </span>
             : <span className="text-success">
             <i className="fa fa-circle"></i> ONLINE
            </span>
            }</span>
            <span>{request.userid.status=="online" && <button
                className="btn btn-sm btn-danger"
                onClick={() => handleClick()}
              >
                Chat
              </button>  }</span>
            </div>
       </div>
    )


}

export default Donate;
