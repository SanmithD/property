import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:7000/api/auth/login`,
        loginData
      );
      if (!response) {
        setIsAlert(true);
        setAlert(response.data.message);
      }
      setIsAlert(true);
      setAlert(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("ownerId", response.data.ownerId);
      setTimeout(() => {
        setIsAlert(false);
        setAlert("");
      }, 1000);
      if (response.data.role == "admin") {
        navigate("/admin/admin");
      } else if (response.data.role == "customer") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {isAlert ? (
        <div className="absolute top-[5%] right-[15%] h-fit w-fit p-1 border-2 border-blue-500 bg-blue-100 rounded text-[16px] md:text-2xl lg:text-3xl ">
          {alert}
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-center items-center h-[500px] sm:h-[500px] md:h-[500p] lg:h-[600px] border-2 border-gray-950 w-[80%] sm:w-[80%] md:w-[60%] lg:w-[70%] p-0 rounded-3xl ">
        <div className="w-full h-full p-0 m-0 bg-gray-900 rounded-3xl flex flex-col items-center justify-center gap-1 md:gap-5 lg:gap-7 ">
          <h1 className="text-[12px] md:text-3xl lg:text-4xl text-white font-bold ">
            Welcome to Find Property
          </h1>
          <a
            href="#name"
            className="text-[16px] md:text-3xl lg:text-4xl text-white font-bold "
          >
            Login
          </a>
        </div>
        <div className="flex flex-col gap-6 sm:gap-6 md:gap-[20px] lg:gap-[40px] w-[100%] pl-1 sm:pl-1 md:pl-[20px] lg:pl-[40px] pr-2.5 pt-3 pb-5 ">
          <label
            htmlFor="email"
            className="text-[16px] sm:text-[16px] md:text-2xl lg:text-3xl font-sans h-[30px] sm:h-[60px] md:h-[50px] lg:h-[40px] flex flex-col "
          >
            Email:
            <input
              type="email"
              name="email"
              id="email"
              className="outline-0 border-0 border-b-2 border-b-gray-950 text-[16px] md:text-[20px] lg:text-[22px]"
              value={loginData.email}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="password"
            className="text-[16px] sm:text-[16px] md:text-2xl lg:text-3xl font-sans h-[30px] sm:h-[60px] md:h-[50px] lg:h-[40px] flex flex-col "
          >
            Password:
            <input
              type="password"
              name="password"
              id="password"
              className="outline-0 border-0 border-b-2 border-b-gray-950 text-[16px] md:text-[20px] lg:text-[22px] "
              value={loginData.password}
              onChange={handleChange}
            />
          </label>
          <Link to="/signup">
            Don't have account? <span className="text-blue-700">Signup</span>
          </Link>
          <button
            onClick={handleLogin}
            className="cursor-pointer h-[50px] sm:h-[50px] md:h-[50px] lg:h-[60px] w-[90px] sm:w-[50px] md:w-[70px] lg:w-[120px] rounded-2xl bg-gray-800 hover:bg-gray-550 text-white text-[16px] sm:text-[16px] md:text-2xl lg:text-3xl font-bold "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
