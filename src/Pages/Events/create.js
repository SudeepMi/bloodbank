
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
// import "./style.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { useEffect } from "react";
import Api from '../../utils/Api';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';


export default function InputAdornments() {
const history = useNavigate();

  const [values, setValues] = React.useState({
    name: "",
    desc: "",
    organizer: "",
    location: "",
    note: "",
    time:'',
    photo:''
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [image, setimage] = React.useState('')
  React.useEffect(() => {
     values.photo && toBase64(values.photo).then(base64 => {
            setimage(base64)
     })
    }
    , [values.photo])

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

    const handleSubmit = () => {
        setLoading(true)
        const intToast = toast.loading("Saving....")
        const formdata = new FormData();
        formdata.append('name', values.name);
        formdata.append('desc', values.desc);
        formdata.append('organizer', values.organizer);
        formdata.append('location', values.location);
        formdata.append('note', values.note);
        formdata.append('photo', values.photo);
        formdata.append('time', values.time);
        Api.post(
            '/events', 
            formdata,
            { headers: {'Content-Type': 'multipart/form-data' }}
        ).then(res => {
            if(res.status === 201){
                setLoading(false)
                toast.dismiss(intToast);
                toast.success("Successfully saved",{
                    closeButton: false,
                })
                history("/events");
            }
        }).catch(err => {
            console.log(err)
        })
    }
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
        pauseOnHover />
      <div className="row text-center profile_set__header">
        <h3>Add new event </h3>
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
            <InputLabel htmlFor="name">Event Name</InputLabel>
            <OutlinedInput
              id="name"
              type={"text"}
              value={values.name}
              onChange={handleChange("name")}
              label="Full Name"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width:"55ch" }}>
            <InputLabel htmlFor="outlined-adornment-desc">Description</InputLabel>
            <OutlinedInput
              id="outlined-adornment-desc"
              value={values.desc}
              onChange={handleChange("desc")}
              startAdornment={
                <InputAdornment position="start">📢</InputAdornment>
              }
              label="desc"
            />
          </FormControl>
          
          <FormControl sx={{ m: 1, width: "55ch" }} variant="outlined">
            <InputLabel htmlFor="organizer">organizer</InputLabel>
            <OutlinedInput
              id="organizer"
              type={"text"}
              value={values.organizer}
              onChange={handleChange("organizer")}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              label="organizer"
            />
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
              value={values.note}
              onChange={handleChange("note")}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              label="note"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "55ch" }} variant="outlined">
          
            <DateTimePicker format="y-MM-dd h:mm:ss a" onChange={ value => setValues({ ...values, ["time"]: value })} value={values.time} />
          </FormControl>



          <FormControl sx={{ m: 1, width: "55ch" }} variant="standard">
              <label 
                htmlFor="file-input"              
                className="upload-btn-wrapper"    
                required
                style={{
                  cursor: 'pointer',
                  border: '1px solid gray',
                  padding: '10px',
                  marginBottom: '20px',
                  background:'#f1f1f1',
                }}>Select a photo</label>
                <input id="file-input" hidden type={"file"} onChange={
                    (e) => {
                        setValues({...values, photo: e.target.files[0]})
                        }
                } />
              
                {values.photo && (
                  <img src={
                    image
                  } style={{height: '200px'}} />
                )}
            </FormControl>
      </Box>
      <div className="profile_submit_btn">
      <Button 
            variant="contained" 
            size="medium" 
            color="error" 
            onClick={handleSubmit} 
        > SAVE</Button>
      </div>
    </div>
  );
}
