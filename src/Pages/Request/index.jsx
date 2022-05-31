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

function BloodRequest() {
  const user = User().user;
  const [profiles, setProfiles] = React.useState([]);

  React.useEffect(() => {
    document.title = "Blood Request";
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    const intToast = toast.loading("Saving....");
    Api.post("/requests", values)
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          toast.dismiss(intToast);
          toast.success("Successfully saved", {
            closeButton: false,
          });
          history("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    Api.post("/profile/getall")
      .then((res) => {
        if (res.status === 200) {
          setProfiles(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const history = useNavigate();

  const [values, setValues] = React.useState({
    location: "",
    blood_group: "",
    message: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="container">
      {loading ? <p>loading..</p> : null}
      <div className="row text-center profile_set__header">
        <h3> Blood Request Form </h3>
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "80%",
          alignContent: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {/* <div> */}

        <FormControl sx={{ m: 1, width: "55ch" }} variant="outlined">
          <InputLabel htmlFor="name">Blood Requested by</InputLabel>
          <OutlinedInput
            id="name"
            type={"text"}
            value={user.email}
            label="Blood Requested by"
            readOnly
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "55ch" }}>
          <InputLabel id="blood_group-select">Blood Group</InputLabel>
          <Select
            labelId="blood_group-select"
            id="blood_group"
            value={values.blood_group}
            label="Blood Group"
            onChange={handleChange("blood_group")}
          >
            <MenuItem value={"A+"}>A+</MenuItem>
            <MenuItem value={"A-"}>A-</MenuItem>
            <MenuItem value={"B+"}>B+</MenuItem>
            <MenuItem value={"B-"}>B-</MenuItem>
            <MenuItem value={"AB+"}>AB+</MenuItem>
            <MenuItem value={"AB-"}>AB-</MenuItem>
            <MenuItem value={"O+"}>O+</MenuItem>
            <MenuItem value={"O-"}>O-</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: "55ch" }} variant="outlined">
          <InputLabel htmlFor="organizer">Location</InputLabel>
          <OutlinedInput
            id="location"
            type={"text"}
            value={values.location}
            onChange={handleChange("location")}
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="location"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "55ch" }} variant="outlined">
          <InputLabel htmlFor="organizer">note</InputLabel>
          <OutlinedInput
            id="note"
            type={"text"}
            value={values.message}
            onChange={handleChange("message")}
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="Note"
          />
        </FormControl>
      </Box>
      <div className="profile_submit_btn">
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={handleSubmit}
        >
          {" "}
          REQUEST
        </Button>
      </div>
      <div className="row">
        <div className="col-md-12 mt-5">
          <h3 className="text-center">Talk to active donors</h3>
        </div>
        <div className="col-md-12">
          <div className="row">
            {profiles.map((profile, index) => {
              return <DonorProfile profile={profile} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodRequest;
