import React from "react";
import defaultphoto from "../assets/svgs/default.jpg";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";

const UserListTable = ({ deleteData, data, searchStr }) => {
  const [page, setPage] = useState(0);
  const employeesPerPage = 6;

  const DeleteHandler = (id) => {
    deleteData(id);
    console.log(id);
  };

  return (
    <React.Fragment>
      <table className="w-full ">
        <thead className=" ">
          <tr className=" sticky top-0 bg-white">
            <th className=" w-[10%]  py-3">S.No.</th>
            <th className=" w-[45%] text-start py-3">Name</th>
            <th className=" w-[25%] text-start py-3">Avatar</th>
            <th className=" w-[10%]  py-4"></th>
            <th className=" w-[10%]  py-4"></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(searchStr.trim().toLowerCase())
            )
            .slice(page, page + employeesPerPage)
            .map((item, i) => {
              return (
                <tr
                  key={i}
                  className="w-full hover:bg-slate-200  border-b-2 border-slate-200 "
                >
                  <td className="text-center py-7  ">{item.id}</td>
                  <td className="">
                    <Link to={`/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>
                    <img
                      width={60}
                      className="ring-1 ring-black ring-offset-1"
                      src={
                        Object.keys(item.avatar).length === 0
                          ? defaultphoto
                          : item.avatar
                      }
                      alt=""
                    />
                  </td>
                  <td>
                    <button
                      className="border-none outline-none"
                      value={item.id}
                      onClick={() => {
                        DeleteHandler(item.id);
                      }}
                    >
                      <div>
                        <DeleteOutline />
                      </div>
                    </button>
                  </td>
                  <td>
                    <Link to={`edit/${item.id}`}>
                      <div>
                        <Edit />
                      </div>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {data.length !== 0 && (
        <div className="flex justify-between px-8 my-2 ">
          <button
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-1 rounded-lg"
            onClick={() => {
              if (page === 0) {
                toast.warn("Please click next to see more data");
                // alert("");
                return;
              }
              setPage(page - employeesPerPage);
            }}
          >
            Previous
          </button>
          <button
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-1 rounded-lg"
            onClick={() => {
              if (
                page + employeesPerPage >=
                data.filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(searchStr.trim().toLowerCase())
                ).length
              ) {
                toast.warn("Last page reached");
                return;
              }
              setPage(page + employeesPerPage);
            }}
          >
            Next
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserListTable;
