"use client"

import SubmitButton from "@/components/master/SubmitButton";

const Subscribe = () => {
  return (
    <div className="card p-3 shadow-sm">
      <span className="f-52 text-center text-muted">
        {" "}
        <i className="bi bi-envelope"></i>
      </span>
      <h6 className="text-center mb-3 mt-0">News Letter</h6>
      <input
        // value={""}
        // onChange={""}
        type="text"
        placeholder="Email Address"
        className="form-control mb3"
      />
      <SubmitButton
        // onClick={""}
        className="btn btn-danger mt-2 w-100"
        // submit={""}
        text="Submit"
      />
    </div>
  );
};

export default Subscribe;
