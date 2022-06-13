import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../utils/Api";
import calculateDistance from "../../utils/Distance";
import User from "../../utils/User";

function DonorProfile({ profile }) {
  const navigate = useNavigate();
  const user = User().user;
  const userLocation = localStorage.getItem("location") || "0,0";
  const handleClick = () => {
    const recipent = profile.userid;
    Api.post("/chat/room", {
      recipent,
    })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.room);
          const room = res.data.room.roomname;
          navigate(`/chat/${room}`, { state: { profile } });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    profile.userid._id !== user._id && (
      <div className="col-md-4 col-sm-10 mt-2">
        <div className="profile_set__card card">
          <div className="profile_set__card_img p-5">
            <img src={profile.photo} width={"100%"} alt="" style={{borderRadius:"10px"}} />
            <h4 className="mt-2">{profile.fullname}</h4>
            <p>Address: {profile.address}</p>
            <p>Blood Group: {profile.blood_group}</p>
            <p className="distance__">
              {calculateDistance(userLocation, profile.location)} KM
              away
            </p>

            <div className="w-100">
            <span className="text-small d-flex align-items-center justify-content-between">{profile.userid.status!=="online" ? 
            <span className="text-danger">
            <i className="fa fa-circle"></i> Away
           </span>
            : <span className="text-success">
            <i className="fa fa-circle"></i> ONLINE
           </span>  }
           <span>{profile.userid.status=="online" &&  <button
                className="btn btn-sm btn-danger"
                onClick={() => handleClick()}
              >
                Chat
              </button> }</span>
           </span>
            
             
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default DonorProfile;
