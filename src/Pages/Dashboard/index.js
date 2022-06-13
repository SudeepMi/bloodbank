import React, { useEffect } from "react";
import Api from "../../utils/Api";
import User from "../../utils/User";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";

function Dashboard() {
  const [profile, setProfile] = React.useState({});
  const [requests, setRequests] = React.useState([]);
  const [location, setLocation] = React.useState("0,0");
  const [notifications, setNotifications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const success = (data) => {
    var crd = data.coords;
    setLocation(`${crd.longitude},${crd.latitude}`);
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    const user = User();
    if (user.token) {
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(success, error, options)
        : console.log("geolocation not supported");
      Api.get("/profile/")
        .then((res) => {
          setProfile(res.data.user);
          localStorage.setItem("profile", JSON.stringify(res.data.user));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });

      Api.get("/requests/my")
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => {});
      Api.get("/notifications/")
        .then((res) => {
          setNotifications(res.data.data);
        })
        .catch((err) => {});
    }
  }, []);

  useEffect(() => {
    const __location = location;
    localStorage.setItem("location", __location);
    if (location !== "0,0") {
      Api.post("/location/", { location: __location })
        .then((res) => {})
        .catch((err) => {});
    }
  }, [location]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-11 m-auto">
          {
           loading ? <Loading />  :  <Sidebar
              profile={profile}
              requests={requests}
              notifications={notifications}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
