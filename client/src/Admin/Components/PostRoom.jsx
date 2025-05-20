import axios from "axios";
import { useState } from "react";

function PostRoom() {
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const [roomData, setRoomData] = useState({
    title: "",
    description: "",
    state: "",
    city: "",
    street: "",
    price: 0,
    bedroom: 0,
    sqFt: 0,
    bathroom: 0,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setRoomData({
      ...roomData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", roomData.title);
    formData.append("image", roomData.image);
    formData.append("description", roomData.description);
    formData.append("price", roomData.price);
    formData.append("state", roomData.state);
    formData.append("city", roomData.city);
    formData.append("street", roomData.street);
    formData.append("bedroom", roomData.bedroom);
    formData.append("sqFt", roomData.sqFt);
    formData.append("bathroom", roomData.bathroom);
    try {
      const response = await axios.post(
        `http://localhost:7000/api/room/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response.data.success == false){
        setIsAlert(true);
        setAlert(response.data.message);
      }
      setIsAlert(true)
      setAlert(response.data.message);
      setTimeout(()=>{
        setIsAlert(false);
        setAlert("");
      },1500)
      setRoomData({
        title: "",
        description: "",
        state: "",
        city: "",
        street: "",
        price: 0,
        bedroom: 0,
        sqFt: 0,
        bathroom: 0,
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-start items-center bg-gray-100 ">
      { 
      isAlert ? 
      <div className="absolute top-[50px] md:top-[100px] lg:top-[130px] right-[100px] md:right-[150px] lg:right-[200px] rounded bg-blue-200 w-fit h-fit p-2 border-2 border-blue-500 " >
        <p>{alert} </p>
      </div>
      : '' }
      <div className="flex flex-col">
        <h1 className="text-[20px] md:text-3xl lg:text-5xl  font-bold font-sans ">
          {" "}
          Post New Property
        </h1>
        <div className="flex flex-col justify-center w-fit border-2 border-purple-950 p-3 gap-0.5 md:gap-1 lg:gap-2 ">
          <label
            htmlFor="image"
            className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
          >
            Image:
            <input
              type="file"
              name="image"
              id="image"
              className="h-[40px] border-2 flex justify-center items-center md:h-[70px] lg:h-[100px] border-y-red-700 text-2xl font-medium text-black "
              onChange={handleChange}
              accept="image/*"
            />
          </label>
          <label
            htmlFor="title"
            className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
          >
            Title
            <input
              type="text"
              name="title"
              id="title"
              className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
              value={roomData.title}
              onChange={handleChange}
            />
          </label>
          <label
            htmlFor="description"
            className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
          >
            Description
            <textarea
              name="description"
              id="description"
              className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
              value={roomData.description}
              onChange={handleChange}
            />
          </label>
          <div className="md:flex lg:flex md:gap-2 lg:gap-2 ">
            <label
              htmlFor="state"
              className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
            >
              State
              <input
                type="text"
                name="state"
                id="state"
                className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
                value={roomData.state}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="city"
              className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
            >
              City
              <input
                type="text"
                name="city"
                id="city"
                className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
                value={roomData.city}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="street"
              className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
            >
              Street
              <input
                type="text"
                name="street"
                id="street"
                className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
                value={roomData.street}
                onChange={handleChange}
              />
            </label>
          </div>
          <label
            htmlFor="price"
            className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
          >
            Price
            <input
              type="number"
              name="price"
              id="price"
              className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
              value={roomData.price}
              onChange={handleChange}
            />
          </label>
          <div className="md:flex lg:flex md:gap-2 lg:gap-2  ">
            <label
              htmlFor="bedroom"
              className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
            >
              Bedroom
              <input
                type="number"
                name="bedroom"
                id="bedroom"
                className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
                value={roomData.bedroom}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="sqFt"
              className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
            >
              Square Feet
              <input
                type="number"
                name="sqFt"
                id="sqFt"
                className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
                value={roomData.sqFt}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="bathroom"
              className="flex flex-col text-[16px] md:text-2xl lg:text-3xl  font-bold font-sans "
            >
              Bathroom
              <input
                type="number"
                name="bathroom"
                id="bathroom"
                className="h-[20px] md:h-[40px] lg:h-[40px] w-full text-[14px] md:text-[18px] font-medium lg:text-[20px] text-black rounded border-2 outline-0 "
                value={roomData.bathroom}
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="h-fit p-1.5 border-2 border-gray-950 font-bold text-white text-2xl cursor-pointer bg-gray-600 hover:bg-gray-950 "
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostRoom;
