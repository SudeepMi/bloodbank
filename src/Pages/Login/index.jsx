import React, { useEffect, useState } from "react";
import "./style.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import API from "../../utils/Api";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Login({setpr}) {
const history = useNavigate();
  const [Classes, setClass] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [ isMobile, setMobile] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobile(true);
        }
        else {
            setMobile(false);
        }
    }, [
        window.innerWidth
    ]);

  const HandleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const intToast = toast.loading("Registering")
      API.post("/users/", {
        username: Username,
        password: Password,
        email: Email,
      }).then(async(res) => {
          if(res.status === 201){
            setSuccess(true);
            setLoading(false);
            toast.dismiss(intToast);
            await toast.success("Successfully Registered",{
                closeButton: false,
            })
            await localStorage.setItem("token", res.data.token);
            await localStorage.setItem("user", JSON.stringify(res.data.user));
            setpr("");
            history("/dashboard");
            window.location.reload(true);
          }
      }).catch(err => {
        toast.dismiss(intToast);
        toast.error("Registeration Failed",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: false,
        });
        setLoading(false);
      })
  }
  
  const HandleLogin = (e) => {
          e.preventDefault();
            setLoading(true);
            const intToast = toast.loading("Logging in")
            API.post("/users/login", {
                email: Email,
                password: Password,
            }).then(async(res) => {
                if(res.status === 200){
                    setSuccess(true);
                    setLoading(false);
                    toast.dismiss(intToast);
                    toast.success("Successfully Logged In",{
                        closeButton: false,
                    })
                    setClass("");
                    setPassword("");
                    setEmail("");
                    setUsername("");
                    await localStorage.setItem("token", res.data.token);
                    await localStorage.setItem("user", JSON.stringify(res.data.user));
            setpr("");
                    
                    history("/dashboard");
                    window.location.reload(true)
                }
            }).catch(err => {
                toast.dismiss(intToast);
                toast.error("Login Failed",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: false,
                });
                setLoading(false);
            })
      
  }

  const check = () => {
    if(!isMobile) return true;
    else return false;
  }

  const showReg= () => {
    if(!isMobile) return true;
    else{
        if(showLogin) return false;
        else return true;
    }
  }

  const showLog= () => {
    if(!isMobile) return true;
    else{
        if(showRegister) return false;
        else return true;
    }
  }
  const handleShowLogin = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowRegister(false);
  }
  const handleShowRegister = (e) => {
    e.preventDefault();
    setShowLogin(false);
    setShowRegister(true);
  }
  return (
    <div className="auth_wrapper">
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
      <div className={`${Classes}` + " container"} id="container">
        { (check() || showReg()) && <div className={`${isMobile && "w-100 z1"} `+"form-container sign-up-container"}>
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fa fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fa fa-google-plus"></i>
              </a>
              <a href="#" className="social">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={(e)=>HandleRegister(e)} className="authbtn">
                {isLoading ? "Loading..." : "Sign Up"}
            </button>
         {isMobile && <button onClick={(e)=>handleShowLogin(e)} className="btn btn-sm mt-3 btn-warning">
            Sign In
          </button>}
          </form>
        </div> }
       { (check() || showLog()) && <div className={`${isMobile && "w-100 z1"} `+"form-container sign-in-container"}>
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fa fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fa fa-google"></i>
              </a>
              <a href="#" className="social">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <a href="#">Forgot your password?</a>
            <button onClick={(e)=>HandleLogin(e)} className="authbtn">Sign In</button>
        {isMobile && <button onClick={(e)=>handleShowRegister(e)} className="btn-sm mt-3 btn-warning">Sign Up</button>}
          </form>
        </div> }
        { !isMobile && <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setClass("")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>BLOODBANK</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setClass("right-panel-active")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div> }
      </div>
    </div>
  );
}

export default Login;
