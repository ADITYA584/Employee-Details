// UserForm.jsx
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomDropdown from "./CustomDropDown.js";
import { toast, ToastContainer } from "react-toastify";

const AddNew = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
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

  // Initial form values
  const initialValues = {
    name: "",
    // avatar: null,
    emailId: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(6, "Must have Six characters")
      .required("Name is required"),
    // avatar: Yup.mixed().required("Avatar is required"),
    emailId: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d+$/, "Mobile number must contain only digits")
      .length(10, "Enter a valid number")
      .required("Mobile number is required"),
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
      await axios.post(
        process.env.REACT_APP_POST_EMPLOYEE_URL,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Employee added successfully");

      resetForm();
    } catch (error) {
      toast.error("Error in adding employee");
    }
  };

  return (
    <div className="container mx-auto mt-[5rem] sm:max-w-[60%] p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">User Form</h1>
      <Formik
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
