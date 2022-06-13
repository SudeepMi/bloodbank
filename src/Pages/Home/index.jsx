import React from "react";
import AboutDonation from "../../components/AboutDonation";
import DonationCentres from "../../components/AboutDonation/DonationCentres";
import Heroslider from "../../components/Heroslider/Heroslider";
import Loading from "../../components/Loading";
import Api from "../../utils/Api";
import User from "../../utils/User";

function Home() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [location, setLocation] = React.useState("");

  const success = (data) => {
    var crd = data.coords;
    setLocation(`${crd.longitude},${crd.latitude}`);
  };

  function __error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  React.useEffect(() => {
    document.title = "Blood Bank | Home";
    navigator.geolocation.getCurrentPosition(success, __error, options);
    setLoading(true);
    Api.get("/events?limit=8")
      .then((res) => {
        setEvents(res.data.event);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const __location = location;
    localStorage.setItem("location", __location);
    if (location !== "0,0" && User().isLoggedIn) {
      Api.post("/location/", { location: __location })
        .then((res) => {})
        .catch((err) => {});
    }
  }, [location]);

  return (
    <div>
      <Heroslider />
      {!loading ? (
        <AboutDonation events={events} />
      ) : (
        <div className="p-2 mt-4 text-center">
          <Loading />
        </div>
      )}
      {error ? <p>{error}</p> : ""}
      <div className="container">
        <DonationCentres />
      </div>
    </div>
  );
}

export default Home;
