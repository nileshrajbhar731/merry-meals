import axios from "axios";

import React, { useState } from "react";
import Loader from "../components/common/loader/Loader";
import { getUserType, BASE_URL } from "../helper/utils.helper";
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const router = useNavigate();
  const sentData = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .post(`${BASE_URL}/api/auth/login`, data)
      .then((res) => {
        // console.log(res.data.user['userRole']);
        setLoader(false);
        const user = res.data.user;
        const token = res.data.token;

        console.log(user);

        if (user.isVerified == true && user.isActive == true) {
          switch (user.userRole) {
            case "member":
              localStorage.setItem("membertokenStore", JSON.stringify(token));
              localStorage.setItem("memberStore", JSON.stringify(user));
              window.location.href = "/member-dashboard";

              // alert("member login");
              return;
            case "caregiver":
              localStorage.setItem(
                "caregivertokenStore",
                JSON.stringify(token)
              );
              localStorage.setItem("caregiverStore", JSON.stringify(user));
              window.location.href = "/caregiver-dashboard";
              // alert("caregiver login");
              return;
            case "partner":
              localStorage.setItem("partnertokenStore", JSON.stringify(token));
              localStorage.setItem("partnerStore", JSON.stringify(user));
              window.location.href = "/partner-dashboard";
              // alert("partner login");

              return;
            case "rider":
              localStorage.setItem("ridertokenStore", JSON.stringify(token));
              localStorage.setItem("riderStore", JSON.stringify(user));
              // router("/rider-dashboard");
              window.location.href = "/rider-dashboard";
              // alert("rider login");

              return;

            case "admin":
              localStorage.setItem("admintokenStore", JSON.stringify(token));
              localStorage.setItem("adminStore", JSON.stringify(user));
              window.location.href = "/admin-dashboard";
              // alert("admin login");

              return;
          }
        }

        if (user.isActive == true && user.isVerified == false) {
          switch (user.userRole) {
            case "member":
              router("/VerificationPending");

              // alert("member Verification Pending");
              return;
            case "caregiver":
              router("/VerificationPending");

              // alert("caregiver Verification Pending");
              return;
            case "partner":
              router("/VerificationPending");
              // alert("partner Verification Pending");
              return;
            case "rider":
              router("/VerificationPending");

              // alert("rider Verification Pending");
              return;

            case "admin":
              router("/VerificationPending");

              // alert("admin Verification Pending");
              return;
          }
        }

        if (user.isActive === false && user.isVerified === false) {
          router("/VerificationDeclined");
          // alert("User Verification Declined");
        }
      })
      .catch((err) => {
        alert(err?.response?.data?.error || "Something went wrong!");
        console.log(err?.response?.data?.error);
      });
  };


  if (!!getUserType()?.trim())
    router(`/${getUserType()?.toLowerCase()}-dashboard`);


  return (
    <form onSubmit={sentData} style={{ margin: "50px" }}>
      <div className="form_container">
        <div
          className="form"
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loader == true && <Loader submit="login" />}
          <div className="form_grp">
            <input
              type="text"
              id="f_name"
              placeholder=" "
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label htmlFor="f_name">Email</label>
          </div>
          <div className="form_grp">
            <input
              type="password"
              id="l_name"
              placeholder=" "
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <label htmlFor="l_name">Password</label>
          </div>
          <div className="form_grp">
            <button className="btn btn_success" type="submit">
              Next
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
