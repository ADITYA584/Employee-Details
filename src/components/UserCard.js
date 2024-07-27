import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import profilePhoto from "../assets/svgs/profilePhoto.png";
import SimpleBackdrop from "./ui/Backdrop";

const UserCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_GET_EMPLOYEE_ID_URL}/${id}`
      );
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" mt-[5rem]  w-full md:w-[65%] p-4">
      {isLoading && <SimpleBackdrop />}
      <div className="grid w-full md:grid-cols-4 gap-4 sm:gap-8 shadow-md p-2 border-2 border-slate-500 border-opacity-20">
        <div className="">
          <img
            width={200}
            src={data.avatar ? data.avatar : profilePhoto}
            alt="avatar"
          />
        </div>
        <div className="  col-span-3 sm:border-l-2 border-opacity-60 border-slate-300 pl-1  ">
          <div className=" flex flex-col  w-full">
            <div className="flex items-center w-full p-2 text-lg sm:text-xl md:text-2xl ">
              <span className="font-bold">Name : </span>
              <h1 className="pl-5">{data.name}</h1>
            </div>
            <div className="flex items-center w-full p-2 text-lg sm:text-xl md:text-2xl">
              <span className="font-bold text-nowrap   ">Email :</span>
              <h1 className=" text-wrap break-all pl-3 md:pl-5">
                {data.emailId}
              </h1>
            </div>
            <div className="flex items-center w-full p-2 text-lg sm:text-xl md:text-2xl">
              <span className="font-bold">Mobile : </span>
              <h1 className="pl-5">{data.mobile}</h1>
            </div>
            <div className="flex items-center w-full p-2 text-lg sm:text-xl md:text-2xl ">
              <span className="font-bold">Country : </span>
              <h1 className="pl-5">{data.country}</h1>
            </div>
            <div className="flex items-center w-full p-2 text-lg sm:text-xl md:text-2xl ">
              <span className="font-bold">State : </span>
              <h1 className="pl-5">{data.state}</h1>
            </div>
            <div className="flex items-center w-full p-2 text-lg sm:text-xl md:text-2xl ">
              <span className="font-bold">District : </span>
              <h1 className="pl-5">{data.district}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
