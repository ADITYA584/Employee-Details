// UserForm.jsx
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomDropdown from "./CustomDropDown.js";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router";

const AddNew = () => {
  const { id } = useParams();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    avatar: null,
    emailId: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });
  // Fetch countries from API
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GET_COUNTRY_URL)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  //   https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/:id
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GET_EMPLOYEE_ID_URL}/${id}`)
      .then((response) => {
        const userData = response.data;
        setInitialValues({
          name: userData.name,
          avatar: userData.avatar,
          emailId: userData.emailId,
          mobile: userData.mobile,
          country: userData.country,
          state: userData.state,
          district: userData.district,
        });
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, [id]);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    // avatar: Yup.mixed().required("Avatar is required"),
    emailId: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile number is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
  });

  //
  // Form submission handler
  const onSubmit = async (values, { resetForm }) => {
    //

    const data = {
      createdAt: new Date().toISOString(),
      name: values.name,
      emailId: values.emailId,
      mobile: values.mobile,
      country: selectedCountry.country || "",
      state: values.state,
      district: values.district, // Ensure this is provided or generated as needed
    };
    console.log(data);

    try {
      await axios.put(
        `${process.env.REACT_APP_PUT_EMPLOYEE_URL}/${id}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Employee added successfully");
      setInitialValues({
        name: "",
        emailId: "",
        mobile: "",
        country: "",
        state: "",
        district: "",
      });
      setCountries(null);
      resetForm();
    } catch (error) {
      toast.error("Error in adding employee");
      console.error("Error:", error.msg);
    }
  };

  return (
    <div className="container mx-auto mt-[5rem] sm:max-w-[60%] p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold underline mb-4">
        Edit Empolyee Details
      </h1>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label htmlFor="emailId">Email</label>
              <Field
                type="email"
                id="emailId"
                name="emailId"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="emailId"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label htmlFor="mobile">Mobile</label>
              <Field
                type="text"
                id="mobile"
                name="mobile"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <CustomDropdown
                options={countries}
                value={selectedCountry}
                onChange={(option) => {
                  setSelectedCountry(option);
                  setFieldValue("country", option.country);
                }}
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <Field
                type="text"
                id="state"
                name="state"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label htmlFor="district">District</label>
              <Field
                type="text"
                id="district"
                name="district"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="district"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNew;
