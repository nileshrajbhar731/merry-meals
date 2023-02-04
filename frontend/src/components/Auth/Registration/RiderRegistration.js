import React, { useEffect, useState } from "react";
import { Progress } from "./Progress";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import BigInfoCard from "../../common/BigInfoCard";
import axios from "axios";
import Address from "../../common/Address/Address";
import {
  acceptedDocs,
  acceptedProfilePic,
  dobValdationProps,
  BASE_URL,
  phNoValidationProps,
} from "../../../helper/utils.helper";
import Loader from "../../common/loader/Loader";
import { useNavigate } from "react-router-dom";

const RiderRegistration = () => {
  const [onStep2, setOnStep2] = useState(false);

  const [selectedPartner, setSelectedPartner] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "Male",
    photo: "",
    address: "",
    email: "",
    password: "",

    partnerId: "",
    partnerTableId: "",
    costPerRide: "",
    isVolunteer: true,
    lisenceNumber: "",
    lisenceDoc: "",
    rcNumber: "",
    rcDoc: "",
  });

  const [res, setres] = useState([]);
  // api call PartberDetails

  useEffect(() => {
    axios.get(`${BASE_URL}/api/partner`).then((response) => {
      setres(response.data.partner);
    });
  }, []);

  let YourPartberDetails = res;
  console.log(YourPartberDetails);

  useEffect(() => {
    setData({
      ...data,
      partnerId: selectedPartner?.mealId?.partnerId?._id || "",
      partnerTableId: selectedPartner?.mealId?.partnerId?.userRoleId || "",
    });
  }, [selectedPartner]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitting...");
    setLoader(true)
    setError("");

    if (data.isVolunteer) {
      console.log("checking if volunteer...");
      setData({ ...data, costPerRide: "0" });
    }

    if (!selectedPartner) {
      setError("To continue you have to select a partner from the list below.");
    } else {
      console.log(data);

      //call partner registration API
      const sendData = new FormData();
      sendData.append("firstName", data.firstName);
      sendData.append("lastName", data.lastName);
      sendData.append("phoneNumber", data.phoneNumber);
      sendData.append("birthDate", data.birthDate);
      sendData.append("gender", data.gender);
      sendData.append("address", data.address);
      sendData.append("email", data.email);
      sendData.append("password", data.password);
      sendData.append("verificationDoc", data.rcDoc);
      if (data.photo) sendData.append("photo", data.photo);

      sendData.append("partnerId", data.partnerId);
      sendData.append("partnerTableId", data.partnerTableId);
      sendData.append("costPerRide", data.costPerRide);
      sendData.append("isVolunteer", data.isVolunteer);
      sendData.append("lisenceNumber", data.lisenceNumber);
      if (data.lisenceDoc) sendData.append("lisenceDoc", data.lisenceDoc);
      sendData.append("rcNumber", data.rcNumber);
      if (data.rcDoc) sendData.append("rcDoc", data.rcDoc);

      console.log(...sendData);

      axios
        .post(`${BASE_URL}/api/auth/register/rider`, sendData, {
          headers: { "Content-Type": "multipart/form-data; boundary=XXX" },
        })
        .then((res) => {
          console.log(res);
          router("/login");
          setLoader(false)
        })
        .catch((error) => {
          console.log(error);
          alert(error?.response?.data?.error || "Something went wrong!");
        });
    }
  };

  return (
    <div>
      <div className="reg_head">
        <h1 className="reg_title">New Rider Registration</h1>
        <p className="reg_subtitle">
          Join us now and earn with us or help us to distribute of free meals.
        </p>
      { loader==true && <Loader/>}
        <Progress
          status={onStep2}
          prog1Title="Rider Details"
          prog2Title="Select Partner"
        />

        {/* {JSON.stringify(data)} */}
        {!onStep2 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOnStep2(true);
            }}
          >
            <div className="form_container">
              <div className="form_row">
                <div className="form_grp">
                  <input
                    required
                    type="text"
                    id="f_name"
                    placeholder=" "
                    value={data.firstName}
                    onChange={(e) => {
                      setData({ ...data, firstName: e.target.value });
                    }}
                  />
                  <label htmlFor="f_name">First Name</label>
                </div>
                <div className="form_grp">
                  <input
                    required
                    type="text"
                    id="l_name"
                    placeholder=" "
                    value={data.lastName}
                    onChange={(e) => {
                      setData({ ...data, lastName: e.target.value });
                    }}
                  />
                  <label htmlFor="l_name">Last Name</label>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    {...phNoValidationProps}
                    required
                    type="number"
                    id="phone"
                    placeholder=" "
                    value={data.phoneNumber}
                    onChange={(e) => {
                      if (e.target.value?.length > 10) return;

                      setData({ ...data, phoneNumber: e.target.value });
                    }}
                  />
                  <label htmlFor="phone">Phone</label>
                </div>
                <div className="form_grp">
                  <div className={data.isVolunteer && "form_grp_disabled"}>
                    <input
                      required
                      type="number"
                      id="cpm"
                      placeholder=" "
                      readOnly={data.isVolunteer}
                      value={data.costPerRide}
                      onChange={(e) => {
                        setData({ ...data, costPerRide: e.target.value });
                      }}
                    />
                    <label htmlFor="cpm">Cost per Ride (&#8377;)</label>
                  </div>
                  <div>or</div>
                  <div>
                    <input
                      type="checkbox"
                      id="isVolunteer"
                      placeholder=" "
                      checked={data.isVolunteer}
                      onChange={() => {
                        setData({ ...data, isVolunteer: !data.isVolunteer });
                      }}
                      onClick={() => {
                        setData({ ...data, costPerMeal: "" });
                      }}
                    />
                    <p>I want to be a volunteer</p>
                  </div>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    required
                    type="date"
                    id="dob"
                    {...dobValdationProps}
                    placeholder=" "
                    value={data.birthDate}
                    onChange={(e) => {
                      setData({ ...data, birthDate: e.target.value });
                    }}
                  />
                  <label htmlFor="dob">Birth Data</label>
                </div>
                <div className="form_grp">
                  <select
                    className="select"
                    name="select"
                    id="select"
                    required
                    value={data.gender}
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label htmlFor="dob">gender</label>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    // required

                    accept={acceptedProfilePic}
                    type="file"
                    id="profile"
                    onChange={(e) => {
                      setData({ ...data, photo: e.target.files[0] });
                    }}
                  />
                  <label htmlFor="profile">Photo</label>
                  <AiOutlineUpload className="upload_icon" />
                </div>
                <Address
                  className="form_grp"
                  handleChange={(val) => setData({ ...data, address: val })}
                />
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    required
                    type="text"
                    id="lisenceNumber"
                    placeholder=" "
                    value={data.lisenceNumber}
                    onChange={(e) => {
                      setData({ ...data, lisenceNumber: e.target.value });
                    }}
                  />
                  <label htmlFor="lisenceNumber">Lisence Number</label>
                </div>
                <div className="form_grp">
                  <input
                    required
                    type="file"
                    id="doc_lisence"
                    accept={acceptedDocs}
                    onChange={(e) => {
                      setData({ ...data, lisenceDoc: e.target.files[0] });
                    }}
                  />
                  <label htmlFor="doc_lisence">Upload Lisence</label>
                  <AiOutlineUpload className="upload_icon" />
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    required
                    type="text"
                    id="rcNumber"
                    placeholder=" "
                    value={data.rcNumber}
                    onChange={(e) => {
                      setData({ ...data, rcNumber: e.target.value });
                    }}
                  />
                  <label htmlFor="rcNumber">RC Number</label>
                </div>
                <div className="form_grp">
                  <input
                    required
                    type="file"
                    accept={acceptedDocs}
                    id="doc_rc"
                    onChange={(e) => {
                      setData({ ...data, rcDoc: e.target.files[0] });
                    }}
                  />
                  <label htmlFor="doc_rc">Upload RC</label>
                  <AiOutlineUpload className="upload_icon" />
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    required
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                    placeholder=" "
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form_grp">
                  <input
                    required
                    type="password"
                    id="password"
                    placeholder=" "
                    value={data.password}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <button className="btn btn_success">Next</button>
            </div>
          </form>
        ) : (
          <form onSubmit={submitForm}>
            <div className="form_container">
              <div className="form_grp form_grp_full">
                <input
                  required
                  type="text"
                  id="selectedPartner"
                  value={selectedPartner ? selectedPartner.brandName : ""}
                  readOnly={true}
                  placeholder=" "
                />
                <label htmlFor="selectedPartner">Selected Partner</label>
                <AiOutlineClose
                  className="add_btn bg_danger"
                  onClick={() => {
                    setSelectedPartner("");
                  }}
                />
                <p className="text-danger">{error}</p>
              </div>

              <div className="gray-container">
                {YourPartberDetails?.map((e,key) => {
                  {
                    /* console.log('address',e?.mealId?.partnerId?.address); */
                  }
                  return (
                    <div className="partner-card-holder" key={key}>
                      <button
                        type="button"
                        className="selector-button-overlay"
                        onClick={() => {
                          setError("");
                          setSelectedPartner(e);
                        }}
                      ></button>
                      <BigInfoCard
                        imgSrc={`${BASE_URL}${e.mealId?.["photoUrl"]}`}
                        imgAlt={e.mealId["photoUrl"]}
                        partnerName={e.brandName}
                        address={e?.mealId?.partnerId?.address}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="btn_container">
                <button
                  type="button"
                  className="btn "
                  onClick={() => {
                    setOnStep2(false);
                  }}
                >
                  Back
                </button>
                <button type="submit" className="btn btn_success">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RiderRegistration;
