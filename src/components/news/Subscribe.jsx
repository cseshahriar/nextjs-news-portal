"use client"

import SubmitButton from "@/components/master/SubmitButton";
import { ErrorToast, IsEmail, SuccessToast } from "@/utility/FormHelper";
import { useState } from "react";

const Subscribe = () => {
  const [data, setData] = useState({email: ""});
  const [submit, setSubmit] = useState(false);

  const handleChange = (name, value) => {
    setData((data) => ({
      ...data, [name]: value
    }))
  }


  const formSubmit = async() => {
    if(IsEmail(data.email)) {
      ErrorToast("Valid Email Address Required");
    } else {
      setSubmit(true);
      const options = {
        method: 'POST', body: JSON.stringify(data)
      };
      const response =  await (await fetch("/api/subscriber", options)).json();
      setSubmit(false);
      setData({email: ""});
      if(response.status === "success") {
        SuccessToast("Request success");
      } else {
        ErrorToast("Try Again");
      }
    }
  }

  return (
    <div className="card p-3 shadow-sm">
      <span className="f-52 text-center text-muted">
        {" "}
        <i className="bi bi-envelope"></i>
      </span>
      <h6 className="text-center mb-3 mt-0">News Letter</h6>
      <input
        value={data.email}
        onChange={(e) => handleChange("email", e.target.value)}
        type="text"
        placeholder="Email Address"
        className="form-control mb3"
      />
      <SubmitButton
        onClick={formSubmit}
        className="btn btn-danger mt-2 w-100"
        submit={submit}
        text="Submit"
      />
    </div>
  );
};

export default Subscribe;
