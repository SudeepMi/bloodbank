import "./App.css";
import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import "react-toastify/dist/ReactToastify.css";
import User from "./utils/User";
import Dashboard from "./Pages/Dashboard";
import SetProfile from "./Pages/Profile/setup";
import EditProfile from "./Pages/Profile/edit";
import Events from "./Pages/Events";
import CreateEvent from "./Pages/Events/create";
import EditEvent from "./Pages/Events/edit";
import { ToastContainer } from "react-toastify";
import EventDetail from "./Pages/Events/detail";
import BloodRequest from "./Pages/Request";
import Chat from "./Pages/Chat/Chat";
import Location from "./Pages/Location/Location";
import usePushNotifications from "./usePushNotifications";
import Notifications from "./Pages/Notification/Notification";
import Footer from "./components/Footer";
import Api from "./utils/Api";
import Donate from "./Pages/Donate/Donate";
import io from "socket.io-client";
import http from "./utils/http";
import About from "./Pages/About";
import Loading from "./components/Loading";
const ENDPOINT = http.host;

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  if (!User()) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
let socket;

function App() {
  const [Loc, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    userConsent,
    pushNotificationSupported,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
  } = usePushNotifications();

  const isConsentGranted = userConsent === "granted";
  const connectPushServer = async () => {
    await onClickSusbribeToPushNotification().then(async (userSubscription) => {
      if (userSubscription) {
        await onClickSendSubscriptionToPushServer(userSubscription).then(
          async (PSSID) => {}
        );
      }
    });
  };
  useEffect(() => {
    !isConsentGranted && onClickAskUserPermission();
    if (pushNotificationSupported && isConsentGranted) {
      connectPushServer();
    }
  }, [isConsentGranted]);
  const [pr, setPr] = React.useState("");

  //make user online
  useEffect(() => {
    if (User().token) {
      Api.put(`/users/${User().user._id}`, { status: "online" });
    }
  }, []);
  const success = (data) => {
    var crd = data.coords;
    setLocation(`${crd.longitude},${crd.latitude}`);
    localStorage.setItem("location", `${crd.longitude},${crd.latitude}`);
    setLoading(false);
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
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(success, error, options)
      : console.log("geolocation not supported");

    socket = io(http.host, {
      path: "/socket",
    });
    if (User().user) {
      socket.emit("online", { userid: User().user._id }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/login" element={<Login setpr={setPr} />} />
          <Route path="/events-focus/:id" element={<EventDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/setprofile/" element={<SetProfile />} />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events/:id/edit" element={<EditEvent />} />
            <Route path="/request-blood" element={<BloodRequest />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/location/:id" element={<Location />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="/donate" element={<Donate />} />
          </Route>
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

export default App;
