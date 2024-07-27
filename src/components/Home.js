import axios from "axios";
import React from "react";
import { useEffect, useState, useRef } from "react";
import UserListTable from "./UserListTable";
import SimpleBackdrop from "./ui/Backdrop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [SearchStr, setSearchStr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const fetchData = () => {
    setIsLoading(true);
    try {
      axios.get(process.env.REACT_APP_GET_EMPLOYEES_URL).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      toast.error("Error in fetching data");
    }
  };
  const DeleteData = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_DELETE_EMPLOYEE_URL}/${id}`
      );
      fetchData();
      toast.success(res.data.name + " emaployee is successfully removed");
    } catch (error) {
      toast.error("Error in deleting data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-[85%]  mt-[5rem]  ">
      <ToastContainer />
      <div className="flex justify-center p-2">
        <div className=" sm:w-[30%]">
          <input
            onChange={() => {
              setSearchStr(inputRef.current.value);
            }}
            ref={inputRef}
            type="text"
            className="w-full p-2 rounded-lg border-2 border-slate-400"
            placeholder="Search"
          />
        </div>
      </div>
      <div className=" h-[74vh] sm:h-[79vh]">
        {/* {console.log(SearchStr)} */}
        {isLoading && <SimpleBackdrop />}
        <UserListTable
          deleteData={DeleteData}
          data={data}
          searchStr={SearchStr}
        />
      </div>
    </div>
  );
};

export default Home;
