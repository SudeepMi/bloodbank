import React from "react";
import "./style.css";
import Api from "../../utils/Api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import User from "../../utils/User";
import { toast } from "react-toastify";
import calculateDistance from "../../utils/Distance";
function EventCard({ event }) {
  const [distance, setDistance] = React.useState(0);
  React.useEffect(() => {
    const eventLocation = event.location.split(",")[1];
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${eventLocation},NP&limit=5&appid=375afe81850264034eab137ce949e9b6`
      )
      .then((res) => {
        if (res.data[0]) {
          const eLocation = `${res.data[0].lon},${res.data[0].lat}`;
          const userLocation = localStorage.getItem("location");
          console.log(userLocation, "jj");
          userLocation &&
            setDistance(calculateDistance(userLocation, eLocation));
        }
      });
  }, []);

  const user = User().user;
  const redirect = useNavigate();
  const handleEnroll = async (event) => {
    await Api.put(`/events/${event._id}/enroll`)
      .then((res) => {
        toast.success("You have enrolled to this event");
        redirect(`/events-focus/${event._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    event.status === "upcoming" && (
      <div
        className="col-lg-4 col-md-6 col-sm-12 my-3"
        key={event._id}
        style={{ minHeight: "360px" }}
      >
        <div className="about-donation__event__header d-grid">
          <h3>
            <Link to={`/events-focus/${event._id}`}>{event.name}</Link>
          </h3>
          <div
            className="photo_frame"
            style={{ background: `url(${event.photo})` }}
          ></div>
          <p className="text-muted font-italic">
            STATUS :{" "}
            {event.status === "upcoming" && (
              <span className="badge badge-success">{event.status}</span>
            )}{" "}
          </p>

          {event.status === "upcoming" && (
            <span className="d-block text-small distance__">
              {distance} KM away
            </span>
          )}

          {/* <p>{event.desc}</p>
        <p>Location : {event.location}</p>
        <p>Date : {event.time}</p>
        <p>Organizer : {event.organizer}</p> */}
          <p>{event.location}</p>
          <div className="d-flex justify-content-between">
            {user &&
              event.status === "upcoming" &&
              !event.enrolled.includes(user._id) && (
                <button
                  className="btn btn-sm px-2 mr-3 btn-primary"
                  onClick={() => handleEnroll(event)}
                >
                  Join
                </button>
              )}
            <Link
              to={`/events-focus/${event._id}`}
              className="btn btn-sm px-2 btn-outline-info btn-block"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    )
  );
}

export default EventCard;
