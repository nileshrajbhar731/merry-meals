import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";

import { getUserType, BASE_URL } from "../../helper/utils.helper";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [userName, setuserName] = useState(false);

  const [isCaregiver, setIsCaregiver] = useState(false);
  const [updatingService, setUpdatingService] = useState(false);
  const [updatedServiceDate, setUpdatedServiceDate] = useState({
    serviceStartDate: "",
    serviceEndDate: "",
  });

  const [res, setres] = useState("");
  const router = useNavigate();
  const path = window.location.pathname.split("/");
  const pathname = path[path.length - 1];
  // console.log(pathname);

  useEffect(() => {
    const isMember = !!JSON.parse(
      localStorage.getItem("memberStore") || JSON.stringify("")
    )?._id;

    const isPartner = !!JSON.parse(
      localStorage.getItem("partnerStore") || JSON.stringify("")
    )?._id;

    const isRider = !!JSON.parse(
      localStorage.getItem("riderStore") || JSON.stringify("")
    )?._id;
    const isAdmin = !!JSON.parse(
      localStorage.getItem("adminStore") || JSON.stringify("")
    )?._id;

    if (isMember) {
      if (localStorage.getItem("memberStore") == null) {
        localStorage.setItem("memberStore", "[]");
      }
      const data = localStorage.getItem("memberStore");
      // console.log(data);
      const json = JSON.parse(data);

      if (json.userRole == "member") {
        axios
          .get(`${BASE_URL}/api/auth/user/${json._id}/Member`)
          .then((response) => {
            if (response?.data?.id?.userRoleId?.isCaregiver) {
              setIsCaregiver(true);
              localStorage.setItem(
                "caregiverStore",
                JSON.stringify(response.data.id)
              );
              // console.log("setting res in header...");
              setres(response.data.id);
              // if (router.asPath?.includes("login"))
              router("/caregiver-dashboard");
              window.dispatchEvent(new Event("storage"));
            } else {
              localStorage.setItem(
                "memberStore",
                JSON.stringify(response.data.id)
              );
              // console.log("setting res in header...");
              setres(response.data.id);
              if (router.asPath?.includes("login")) router("/member-dashboard");
            }
          });
      }
      return;
    }

    if (isPartner) {
      if (localStorage.getItem("partnerStore") == null) {
        localStorage.setItem("partnerStore", "[]");
      }
      const datapartner = localStorage.getItem("partnerStore");
      // console.log(datapartner);
      const jsonpartner = JSON.parse(datapartner);
      // console.log(jsonpartner._id);

      if (jsonpartner.userRole == "partner") {
        // s[0].toUpperCase() + s.slice(1)
        axios
          .get(`${BASE_URL}/api/auth/user/${jsonpartner._id}/Partner`)
          .then((response) => {
            // setres(response.data.users);
            localStorage.setItem(
              "partnerStore",
              JSON.stringify(response.data.id)
            );
            window.dispatchEvent(new Event("storage"));
            // console.log(response.data.id);
            setres(response.data.id);
            if (router.asPath?.includes("login")) router("/partner-dashboard");
          });
      }
      return;
    }

    if (isRider) {
      if (localStorage.getItem("riderStore") == null) {
        localStorage.setItem("riderStore", "[]");
      }
      const datarider = localStorage.getItem("riderStore");
      // console.log(datarider);
      const jsonrider = JSON.parse(datarider);

      if (jsonrider.userRole == "rider") {
        axios
          .get(`${BASE_URL}/api/auth/user/${jsonrider._id}/Rider`)
          .then((response) => {
            // setres(response.data.users);
            localStorage.setItem(
              "riderStore",
              JSON.stringify(response.data.id)
            );
            // console.log(response.data.id);
            setres(response.data.id);
            window.dispatchEvent(new Event("storage"));
            // window.location.reload();
            if (router.asPath?.includes("login")) router("/rider-dashboard");
          });
      }
      return;
    }
    if (isAdmin) {
      if (localStorage.getItem("adminStore") == null) {
        localStorage.setItem("adminStore", "[]");
      }
      const dataAdmin = localStorage.getItem("adminStore");
      // console.log(dataAdmin);
      const jsonAdmin = JSON.parse(dataAdmin);

      if (jsonAdmin.userRole == "admin") {
        axios
          .get(`${BASE_URL}/api/auth/user/${jsonAdmin._id}/Admin`)
          .then((response) => {
            localStorage.setItem(
              "adminStore",
              JSON.stringify(response?.data?.id)
            );
            window.dispatchEvent(new Event("storage"));
            // console.log(response?.data?.id);
            setres(response?.data?.id);
            if (pathname?.includes("login")) router("/admin-dashboard");
          });
      }
      return;
    }
  }, []);

  // console.log(res);

  const logOut = () => {
    localStorage.removeItem("memberStore");
    localStorage.removeItem("member");
    localStorage.removeItem("membertokenStore");
    localStorage.removeItem("caregiverStore");
    localStorage.removeItem("caregivertokenStore");
    localStorage.removeItem("partnerStore");
    localStorage.removeItem("partnertokenStore");
    localStorage.removeItem("riderStore");
    localStorage.removeItem("ridertokenStore");
    localStorage.removeItem("admintokenStore");
    localStorage.removeItem("adminStore");
  window.location.href="/login"
  };

  const setNewServiceDate = (e) => {
    e.preventDefault();
    // console.log("new serivce dates - ", updatedServiceDate);

    const dataF = localStorage.getItem("memberStore");
    // console.log(data);
    const json = JSON.parse(dataF);

    const data = {
      _id: json?.userRoleId?._id,
      serviceStartDate: updatedServiceDate?.serviceStartDate,
      serviceEndDate: updatedServiceDate?.serviceEndDate,
    };

    console.log(data);

    //call api to update service date
    axios.post(`${BASE_URL}/api/auth/members/service`, data).then((res) => {
      // console.log(res);
      alert(res?.data?.message);
      setUpdatingService(false);
      window.location.reload();
    });

    //
  };

  const Donate = () => {
    alert("window server not working");
    router("/donation");
  };

  return (
    <>
      <header className={`${styles.headerContainer}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.main}`}>
            <div className={`${styles.row}`}>
              <div className={`${styles.phone}`}>
                <img src="/icons/phone-solid.svg" alt="img" />
                <p>+918828283744</p>
              </div>

              <div className={`${styles.mail}`}>
                <img src="/icons/envelope-solid.svg" alt="img" />
                <p>support@merrymeal.com</p>
              </div>
            </div>

            <button className={`${styles.btn}`} onClick={Donate}>
              Donate
            </button>
          </div>
        </div>

        <div className={`${styles.container_main}`}>
          <div className={`${styles.logo}`}>
            <Link to="/">
              <img src="/icons/logo.png" alt="img" />
            </Link>
            {}
            <div className={`${styles.nav}`}>
              <div className={`${styles.list}`}>
                {res?.length !== 0 ? (
                  <>
                    <li>
                      <Link
                        to={
                          isCaregiver
                            ? "caregiver-dashboard"
                            : `/${getUserType()?.toLowerCase()}-dashboard`
                        }
                        className={`${
                          pathname?.includes(
                            `${getUserType()?.toLowerCase()}-dashboard`
                          )
                            ? styles.active
                            : ""
                        }`}
                      >
                        {isCaregiver
                          ? "Caregiver Dashboard"
                          : `${getUserType()} Dashboard`}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={logOut}
                        style={{ color: "red" }}
                      >
                        Logout
                      </Link>
                    </li>

                    <div
                      className={`${styles.profile}`}
                      onClick={() => setuserName(true)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className={`${styles.profileImg}`}>
                        <img
                          src={
                            res?.photoUrl
                              ? `${BASE_URL}${res?.photoUrl}`
                              : `/images/default.jpg`
                          }
                          alt="img"
                        />
                      </div>

                      <h4>
                        {res?.firstName} {res?.lastName}
                        <p>{isCaregiver ? "caregiver" : res?.userRole}</p>
                      </h4>
                    </div>
                  </>
                ) : (
                  <>
                    <li
                      className={`${
                        pathname?.includes("") ? styles.active : ""
                      }`}
                    >
                      <Link to="/">Home</Link>
                    </li>
                    <li
                      className={`${
                        pathname?.includes("about") ? styles.active : ""
                      }`}
                    >
                      <Link to="/about">About Us</Link>
                    </li>
                    <li
                      className={`${
                        pathname?.includes("contact") ? styles.active : ""
                      }`}
                    >
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li
                      className={`${
                        pathname?.includes("member-register")
                          ? styles.active
                          : ""
                      }`}
                    >
                      <Link to="/member-register">Member</Link>
                    </li>
                    <li
                      className={`${
                        pathname?.includes("caregiver-register")
                          ? styles.active
                          : ""
                      }`}
                    >
                      <Link to="/caregiver-register">Caregiver</Link>
                    </li>
                    <li
                      className={`${
                        pathname?.includes("partner-register")
                          ? styles.active
                          : ""
                      }`}
                    >
                      <Link to="/partner-register">Partner</Link>
                    </li>
                    <li
                      className={`${
                        pathname?.includes("rider-register")
                          ? styles.active
                          : ""
                      }`}
                    >
                      <Link to="/rider-register">Rider</Link>
                    </li>
                    <li
                      className={`${
                        pathname?.includes("login") ? styles.active : ""
                      }`}
                    >
                      <Link to="/login">Login</Link>
                    </li>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {userName ? (
          <>
            <div className={`${styles.conatiner_popup}`}>
              <div className={`${styles.container_main_popup}`}>
                <button
                  className={`${styles.btn_main}`}
                  onClick={() => setuserName(false)}
                >
                  X
                </button>
                <figure className={`${styles.snip0045}`}>
                  {/* {console.log(res)} */}
                  {!updatingService ? (
                    <figcaption>
                      <h2>
                        {res?.firstName} <span>{res?.lastName}</span>
                      </h2>
                      <p>{res?.email}</p>
                      <p>{res?.phoneNumber}</p>
                      <p>{res?.gender}</p>
                      {getUserType().toLowerCase() === "member" && (
                        <>
                          <p>
                            Service Expires on -{" "}
                            {new Date(res?.userRoleId.serviceEndDate).getDate()}
                            /
                            {new Date(
                              res?.userRoleId.serviceEndDate
                            ).getMonth() + 1}
                            /
                            {new Date(
                              res?.userRoleId.serviceEndDate
                            ).getFullYear()}
                          </p>
                          <button
                            type="button"
                            onClick={() => setUpdatingService(true)}
                            className={`${styles.btn_update}`}
                          >
                            Update Service
                          </button>
                        </>
                      )}
                    </figcaption>
                  ) : (
                    <figcaption>
                      <h2>Update your service details</h2>

                      <form onSubmit={setNewServiceDate}>
                        <div className={`${styles.form_grp}`}>
                          <input
                            type="date"
                            id="startDate"
                            placeholder=" "
                            required
                            value={updatedServiceDate.serviceStartDate}
                            min={
                              new Date(
                                res?.userRoleId.serviceEndDate || new Date()
                              )
                                .toISOString()
                                .split("T")[0]
                            }
                            onChange={(e) =>
                              setUpdatedServiceDate({
                                ...updatedServiceDate,
                                serviceStartDate: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="startDate">Service Start Date</label>
                        </div>
                        <div className={`${styles.form_grp}`}>
                          <input
                            type="date"
                            id="endDate"
                            placeholder=" "
                            required
                            value={updatedServiceDate.serviceEndDate}
                            min={
                              new Date(
                                updatedServiceDate.serviceStartDate ||
                                  new Date()
                              )
                                .toISOString()
                                .split("T")[0]
                            }
                            onChange={(e) =>
                              setUpdatedServiceDate({
                                ...updatedServiceDate,
                                serviceEndDate: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="endDate">Service End Date</label>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUpdatingService(false)}
                          className={`${styles.btn_red}`}
                        >
                          Cancel
                        </button>
                        <button type="submit" className={`${styles.btn_green}`}>
                          Update
                        </button>
                      </form>
                    </figcaption>
                  )}

                  <img
                    src={
                      res?.photoUrl
                        ? `${BASE_URL}${res?.photoUrl}`
                        : `/images/default.jpg`
                    }
                    alt={res?.photoUrl}
                  />
                  <div className={`${styles.position}`}>
                    {new Date(res?.birthDate).getDate()}/
                    {new Date(res?.birthDate).getMonth() + 1}/
                    {new Date(res?.birthDate).getFullYear()}
                  </div>
                </figure>
              </div>
            </div>
          </>
        ) : null}
      </header>
    </>
  );
}
