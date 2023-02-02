import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import Modal from "react-modal";
import {
  acceptedDocs,
  acceptedProfilePic,
  BASE_URL,
  dobValdationProps,
  phNoValidationProps,
} from "../../../helper/utils.helper";
import Card from "../../common/Card";
import ScheduleCard from "../../common/ScheduleCard";
import { Progress } from "./Progress";
// import BsStyle from '../../../styles/bs.module.css'
import { useRouter } from "next/router";
import Address from "../../common/Address/Address";
import Loader from "../../common/loader/Loader";


const MemberRegistration = ({registeringCaregiver=false}) => {
  const router = useRouter();
  const [onStep2, setOnStep2] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  //modal
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "Male",
    address: "",
    email: "",
    password: "",
    verificationDoc: "",
    photo: "",
    reasonForRequest: "",
    weekSchedule: [
      {
        day: "Mon",
        mealId: "",
      },
      {
        day: "Tue",
        mealId: "",
      },
      {
        day: "Wed",
        mealId: "",
      },
      {
        day: "Thu",
        mealId: "",
      },
      {
        day: "Fri",
        mealId: "",
      },
      {
        day: "Sat",
        mealId: "",
      },
      {
        day: "Sun",
        mealId: "",
      },
    ],
    serviceStartDate: "",
    serviceEndDate: "",
    isCaregiver: registeringCaregiver
  });

  // returns true if both days provided are same
  const dayMatcher = (day1, day2) => {
    if (day1 === day2) {
      return true;
    } else {
      return false;
    }
  };

  const [res, setres] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/api/partner`).then((res) => {
      setres(res.data.partner);
    });
  }, []);

  let fakeMealData = res;

  console.log(fakeMealData);

  // let fakeMealData = [
  //     {
  //         mealId: '01',
  //         mealTitle: 'Veg Thali',
  //         partnerId: '102',
  //         partnerName: 'XYZ Foundation',
  //         imgSrc: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
  //         coreItems: ["samosa", "samosa", "samosa", "samosa"],
  //     },
  //     {
  //         mealTitle: 'Non Thali',
  //         partnerName: 'YMCA',
  //         partnerId: '103',
  //         mealId: '02',
  //         imgSrc: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
  //         coreItems: ["samosa", "samosa", "samosa", "samosa"],
  //     },
  //     {
  //         mealTitle: 'Veg Biryani',
  //         partnerName: 'XYZ Organization',
  //         partnerId: '104',
  //         mealId: '03',
  //         imgSrc: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
  //         coreItems: ["samosa", "samosa", "samosa", "samosa"],
  //     },
  //     {
  //         mealTitle: 'Chicken Biryani',
  //         partnerName: 'ABC Helps',
  //         partnerId: '105',
  //         mealId: '04',
  //         imgSrc: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
  //         coreItems: ["samosa", "samosa", "samosa", "samosa"],
  //     },
  //     {
  //         mealTitle: 'Paneer Chilli',
  //         partnerName: 'Hopes',
  //         partnerId: '106',
  //         mealId: '05',
  //         imgSrc: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
  //         coreItems: ["samosa", "samosa", "samosa", "samosa"],
  //     },
  // ]

  const submitForm = async (e) => {
    e.preventDefault();
    setLoader(true)
    setError("");

    const emptyScheduleFound = false;

    data.weekSchedule.map((schedule) => {
      if (schedule.mealId === "") {
        console.log("empty schedule found...!!!");
        setError(
          "Select meals for each day. You can always change that later.",
        );
        emptyScheduleFound = true;
      }
    });

    if (!emptyScheduleFound) {
      // console.log(data);

      //   const sendData = {
      //     firstName: data.firstName,
      //     lastName: data.lastName,
      //     phoneNumber: data.phoneNumber,
      //     birthDate: data.birthDate,
      //     gender: data.gender,
      //     address: data.address,
      //     email: data.email,
      //     password: data.password,
      //     verificationDoc: await getBase64(data.verificationDoc),
      //     photo: await getBase64(data.photo),
      //     reasonForRequest: data.reasonForRequest,
      //     weekSchedule: data.weekSchedule,
      //     serviceStartDate: data.serviceStartDate,
      //     serviceEndDate: data.serviceEndDate,
      //     };
      const sendData = new FormData();
      sendData.append("firstName", data.firstName);
      sendData.append("lastName", data.lastName);
      sendData.append("phoneNumber", data.phoneNumber);
      sendData.append("birthDate", data.birthDate);
      sendData.append("gender", data.gender);
      sendData.append("address", data.address);
      sendData.append("email", data.email);
      sendData.append("password", data.password);
      sendData.append("verificationDoc", data.verificationDoc);
      if (data.photo) sendData.append("photo", data.photo);
      sendData.append("reasonForRequest", data.reasonForRequest);
      sendData.append("weekSchedule", JSON.stringify(data.weekSchedule));
      sendData.append("serviceStartDate", data.serviceStartDate);
      sendData.append("serviceEndDate", data.serviceEndDate);
      if(registeringCaregiver) sendData.append("isCaregiver", data.isCaregiver);

      console.log(...sendData);
      //call api
      axios
        .post(`${BASE_URL}/api/auth/register/member`, sendData, {
          headers: { "Content-Type": "multipart/form-data; boundary=XXX" },
        })
        .then((res) => {
          console.log(res);
          router.push("/login");
          setLoader(false)

        })
        .catch((error) => {
          console.log(error);
          alert(error?.response?.data?.error || "Something went wrong!");
        });
    }
  };

  return (
    <div className={``}>
      <div className="reg_head">
        <h1 className="reg_title">{registeringCaregiver ? 'Register Your New Member' : 'New Member Registration'}</h1>
        <p className="reg_subtitle">
          {console.log(registeringCaregiver)}
          {registeringCaregiver
            ? 'Books free meals for other. Add your member details below.'
            : 'Meals are no longer a problem. Join us now and get free meals for yourself.'
          }
        </p>
        {/* <p>{JSON.stringify(data)}</p> */}
        { loader==true && <Loader/>}
        <Progress
          status={onStep2}
          prog1Title="Personal Details"
          prog2Title="Subscription Details"
        />

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
                    type="text"
                    id="f_name"
                    placeholder=" "
                    required
                    value={data.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                  />
                  <label htmlFor="f_name">{registeringCaregiver && "Member's"} First Name</label>
                </div>
                <div className="form_grp">
                  <input
                    type="text"
                    id="l_name"
                    placeholder=" "
                    required
                    value={data.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                  />
                  <label htmlFor="l_name">{registeringCaregiver && "Member's"} Last Name</label>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    {...phNoValidationProps}
                    type="number"
                    id="phn"
                    placeholder=" "
                    required
                    value={data.phoneNumber}
                    onChange={(e) => {
                      if (e.target.value?.length > 10) return;
                      setData({ ...data, phoneNumber: e.target.value });
                    }}
                  />
                  <label htmlFor="phn">{registeringCaregiver && "Member's"} Phone</label>
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
                  <label htmlFor="select">{registeringCaregiver && "Member's"} Gender</label>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    type="text"
                    id="reason"
                    placeholder=" "
                    required
                    value={data.reasonForRequest}
                    onChange={(e) =>
                      setData({ ...data, reasonForRequest: e.target.value })
                    }
                  />
                  <label htmlFor="reason">Reason for Joining</label>
                </div>
                <div className="form_grp">
                  <input
                    type="file"
                    id="doc"
                    accept={acceptedDocs}
                    required
                    onChange={(e) => {
                      setData({ ...data, verificationDoc: e.target.files[0] });
                    }}
                  />
                  <label htmlFor="doc">Upload Document</label>
                  <AiOutlineUpload className="upload_icon" />
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    {...dobValdationProps}
                    type="date"
                    id="dob"
                    placeholder=" "
                    required
                    value={data.birthDate}
                    onChange={(e) =>
                      setData({ ...data, birthDate: e.target.value })
                    }
                  />
                  <label htmlFor="dob">{registeringCaregiver && "Member's"} Date of Birth</label>
                </div>
                <div className="form_grp">
                  <input
                    type="file"
                    id="profile"
                    accept={acceptedProfilePic}
                    onChange={(e) =>
                      setData({ ...data, photo: e.target.files[0] })
                    }
                  />
                  <label htmlFor="profile">{registeringCaregiver && "Member's"} Profile Photo</label>
                  <AiOutlineUpload className="upload_icon" />
                </div>
              </div>

              <div className="form_row">
                <Address
                  className="form_grp form_grp_full"
                  registeringCaregiver={registeringCaregiver}
                  handleChange={(val) => setData({ ...data, address: val })}
                />
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    required
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form_grp">
                  <input
                    type="password"
                    id="password"
                    placeholder=" "
                    required
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <button className="btn btn_success">Next</button>
            </div>
          </form>
        ) : (
          // <button onClick={() => { setOnStep2(false) }}>Back</button>
          <form onSubmit={submitForm}>
            <div className="form_container">
              <div className="form_row">
                <div className="form_grp">
                  <input
                    type="date"
                    id="startDate"
                    placeholder=" "
                    required
                    value={data.serviceStartDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setData({ ...data, serviceStartDate: e.target.value })
                    }
                  />
                  <label htmlFor="startDate">Service Start Date</label>
                </div>

                <div className="form_grp">
                  <input
                    type="date"
                    id="endDate"
                    placeholder=" "
                    required
                    value={data.serviceEndDate}
                    min={
                      new Date(data.serviceStartDate || new Date())
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setData({ ...data, serviceEndDate: e.target.value })
                    }
                  />
                  <label htmlFor="endDate">Service End Date</label>
                </div>
              </div>

              <div className="gray-container flex-wrap">
                {data.weekSchedule.map((schedule, key) => {
                  return (
                    <ScheduleCard
                      key={key}
                      weekDay={schedule.day}
                      mealTitle={fakeMealData.map((meal) => {
                        if (schedule.mealId === meal.mealId["_id"]) {
                          return meal.mealId["name"];
                        }
                      })}
                      partner={
                        schedule.mealId &&
                        fakeMealData.map((meal) => {
                          if (schedule.mealId === meal.mealId["_id"]) {
                            return meal.brandName;
                          }
                        })
                      }
                      btnTitle={schedule.mealId ? "Update Meal" : "Select Meal"}
                      selectMeal={() => {
                        setSelectedDay(schedule.day);
                        toggleModal();
                      }}
                    />
                  );
                })}
              </div>
              <div className="form_row">
                <div className="form_grp form_grp_full">
                  <p className="text-danger">{error}</p>
                </div>
              </div>

              <div className="btn_container mt-3">
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

            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              ariaHideApp={false}
            >
              <div className="modal-header">
                <h3>Select Meal - {selectedDay}</h3>
                <AiOutlineClose
                  className="modal-close-icon"
                  style={{ cursor: "pointer" }}
                  role="button"
                  onClick={toggleModal}
                />
              </div>

              <div className="modal-body">
                <div className="gray-container flex-wrap ">
                  {fakeMealData.map((meal, key) => {
                    return (
                      <Card
                        key={key}
                        imgSrc={`${BASE_URL}${meal.mealId["photoUrl"]}`}
                        mealName={meal.mealId["name"]}
                        partnerName={meal.brandName}
                        coreItems={meal.mealId["coreItems"]}
                        btnValue={JSON.stringify(meal)}
                        btnTitle="Select"
                        btnFn={(e) => {
                          const updatedWeekSchedule = [];
                          data.weekSchedule.map((schedule) => {
                            updatedWeekSchedule.push(
                              (
                                <>
                                  {schedule.day === selectedDay
                                    ? {
                                      day: selectedDay,
                                      mealId: JSON.parse(e).mealId["_id"],
                                    }
                                    : schedule}
                                </>
                              ).props.children,
                            );
                          });
                          setData({
                            ...data,
                            weekSchedule: updatedWeekSchedule,
                          });
                          toggleModal();
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn" onClick={toggleModal}>
                  Close
                </button>
              </div>
            </Modal>
          </form>
        )}
      </div>
    </div>
  );
};

export default MemberRegistration;
