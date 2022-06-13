import React from "react";
import "./style.css";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import User from "../../utils/User";
import { Button } from "@mui/material";
import UserChangeIcon from "@rsuite/icons/UserChange";
import NoticeIcon from "@rsuite/icons/Notice";
import DragableIcon from "@rsuite/icons/Dragable";
import { toast } from "react-toastify";
import Api from "../../utils/Api";

function Sidebar({ profile, requests, notifications }) {
  // console.log(profile);
  const user = User().user;
  const [lastRead, setLastRead] = React.useState(0);

  const handleCompleted = async (id) => {
    const intToast = toast.loading("Saving....");
    await Api.put("/requests/" + id, {
      status: "completed",
    })
      .then((res) => {
        if (res.status === 200) {
          toast.dismiss(intToast);
          toast.success("Successfully saved", {
            closeButton: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    document.title = "BloodBank | Dashboard";
    const last__Read = localStorage.getItem("lastRead") || 0;
    setLastRead(last__Read);
  }, []);

  return (
    <div className={`sidebar__box ${!profile.length > 0 && "d-grid"}`}>
      {profile._id ? (
        <>
          <div className="sidebar__box__header">
            <Avatar
              src={profile.photo}
              sx={{ width: 150, height: 150 }}
              variant="circular"
            />
            <h4>{profile.fullname || user.email}</h4>
            <p>{user.isAdmin && "ADMIN"}</p>
          </div>

          <div className="toolbar">
            {user.isAdmin && (
              <Link to={`/events`} className="link">
                <UserChangeIcon className="mx__2" />
                Events
              </Link>
            )}
            {user.isAdmin && (
              <Link to={`/donations`} className="link">
                <DragableIcon className="mx__2" />
                Donations
              </Link>
            )}
            {user.isAdmin && (
              <Link to={`/notifications`} className="link d-flex">
                <NoticeIcon className="mx__2" />
                Notification{" "}
                <span className="ml-2 badge badge-info">
                  {notifications.length - lastRead}
                </span>
              </Link>
            )}
            {!user.isAdmin && (
              <Link to={`/edit-profile/${profile._id}`} className="link">
                <UserChangeIcon className="mx__2" />
                Edit Profile
              </Link>
            )}
          </div>
          <div className="profile row">
            <div className="profile__content col-md-6">
              <h5>Your Profile</h5>
              <ul>
                <li>
                  <span>Full Name : </span>
                  <span>{profile.fullname}</span>
                </li>
                <li>
                  <span>Age : </span>
                  <span>{profile.age}</span>
                </li>
                <li>
                  <span>Blood Group : </span>
                  <span>{profile.blood_group}</span>
                </li>
                <li>
                  <span>Gender : </span>
                  <span>{profile.gender}</span>
                </li>
                <li>
                  <span>Weight : </span>
                  <span>{profile.weight}</span>
                </li>
                <li>
                  <span>Address : </span>
                  <span>{profile.address}</span>
                </li>
              </ul>
            </div>
            <div className="profile__content col-md-6 ">
             {requests.length > 0 && <h5>Your blood request</h5>}
              {requests &&
                requests.map((request, index) => (
                  <div className="card p-3 my-2" key={index}>
                    <span>Blood Group: {request.blood_group}</span>
                    <span>Location : {request.location}</span>
                    <span>Date : {new Date(request.createdAt).toUTCString()}</span>
                    <span>Status : {request.status} </span>
                    {request.status !== "completed" && (
                      <button
                        className="btn btn-dark my-2 btn-sm"
                        onClick={() => handleCompleted(request._id)}
                      >
                        {"Completed"}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="sidebar__box__no_profile d-grid">
          <h3>You have no profile</h3>
          <p>Hello, {user.email} set up your profile</p>
          <Link to="/setprofile" className="mt-small">
            <Button variant="outlined" color="warning">
              {" "}
              SET UP PROFILE
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
