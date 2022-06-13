import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import "./style.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { useEffect } from "react";
import Api from "../../utils/Api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProfile() {
  const history = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [values, setValues] = React.useState({
    fullname: "",
    gender: "",
    weight: "",
    height: "",
    location: "",
    address: "",
    age: "",
    blood_group: "",
    photo: "",
  });
  useEffect(() => {
    Api.get(`/profile/`)
      .then((res) => {
        setValues(res.data.user);
        setimage(res.data.user.photo);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [image, setimage] = React.useState("");
  React.useEffect(() => {
    values.photo &&
      toBase64(values.photo).then((base64) => {
        setimage(base64);
      });
  }, [values.photo]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = () => {
    setLoading(true);
    const intToast = toast.loading("Saving....");
    const formdata = new FormData();
    formdata.append("fullname", values.fullname);
    formdata.append("gender", values.gender);
    formdata.append("age", values.age);
    formdata.append("weight", values.weight);
    formdata.append("height", values.height);
    formdata.append("location", values.location);
    formdata.append("address", values.address);
    formdata.append("blood_group", values.blood_group);
    formdata.append("photo", values.photo);
    Api.put("/profile", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.dismiss(intToast);
          toast.success("Successfully saved", {
            closeButton: false,
          });
          setTimeout(() => {
            history.push("/profile");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="row text-center profile_set__header">
        <h3>Set up your profile 😈 </h3>
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
          <InputLabel htmlFor="fullname">Full Name</InputLabel>
          <OutlinedInput
            id="fullname"
            type={"text"}
            value={values.fullname}
            onChange={handleChange("fullname")}
            label="Full Name"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "55ch" }}>
          <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-address"
            value={values.address}
            onChange={handleChange("address")}
            startAdornment={
              <InputAdornment position="start">📢</InputAdornment>
            }
            label="Address"
          />
        </FormControl>

        {/* </div>
        <div> */}
        <FormControl sx={{ m: 1, width: "55ch" }}>
          <InputLabel id="gender-select">Gender</InputLabel>
          <Select
            labelId="gender-select"
            id="gender"
            value={values.gender}
            label="Gender"
            onChange={handleChange("gender")}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
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

        {/* </div>
        <div> */}
        <FormControl sx={{ m: 1, width: "55ch" }}>
          <InputLabel id="age-select">Age</InputLabel>
          <Select
            labelId="age-select"
            id="age"
            value={values.age}
            label="Age"
            onChange={handleChange("age")}
          >
            {Array.from(Array(43).keys()).map((i) => (
              <MenuItem value={i + 18} key={i}>
                {i + 18}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "55ch" }} variant="outlined">
          <InputLabel htmlFor="fullname">Weight</InputLabel>
          <OutlinedInput
            id="fullname"
            type={"text"}
            value={values.weight}
            onChange={handleChange("weight")}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            label="Weight"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "55ch" }} variant="standard">
          <label
            htmlFor="file-input"
            className="upload-btn-wrapper"
            required
            style={{
              cursor: "pointer",
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "20px",
              background: "#f1f1f1",
            }}
          >
            Select a photo
          </label>
          <input
            id="file-input"
            hidden
            type={"file"}
            onChange={(e) => {
              setValues({ ...values, photo: e.target.files[0] });
            }}
          />

          {values.photo && (
            <img src={image} style={{ height: "200px" }} alt="pp" />
          )}
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
          SAVE
        </Button>
      </div>
    </div>
  );
}
