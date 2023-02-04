import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import {
  acceptedDocs,
  acceptedProfilePic,
  BASE_URL,
  dobValdationProps,
  phNoValidationProps,
} from "../../../helper/utils.helper";
import Address from "../../common/Address/Address";
import Loader from "../../common/loader/Loader";
import { Progress } from "./Progress";

const PartnerRegistration = () => {
  const [onStep2, setOnStep2] = useState(false);

  const [currentItem, setCurrentItem] = useState("");
  const [selecteditem, setSelecteditem] = useState("");
  const [loader, setLoader] = useState(false);

  const [partner, setPartner] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "Male",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
    verificationDoc: "",
    photo: "",
    brandName: "",
    costPerMeal: "",
    isVolunteer: true,
  });

  const [meal, setMeal] = useState({
    name: "",
    description: "",
    mealType: true,
    photo: "",
    coreItems: [],
    partnerId: "",
    fats: "",
    carbs: "",
    protein: "",
    cholesterol: "",
  });

  const pushItem = () => {
    if (currentItem) {
      meal.coreItems.push(currentItem);
      setCurrentItem("");
    }
  };

  const removeItem = (_item) => {
    const updatedItemList = [];
    meal.coreItems.map((item, key) => {
      if (item !== _item) {
        updatedItemList.push(item);
      }
    });
    setMeal({ ...meal, coreItems: updatedItemList });
  };
const router=useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoader(true)

    if (partner.isVolunteer) {
      console.log("checking if volunteer...");
      setPartner({ ...partner, costPerMeal: "0" });
    }

    if (meal.coreItems.length === 0) {
      console.log("checking if added meal items...");
      document
        .getElementById("meal_item")
        .setCustomValidity("Add atleast 1 item");
    } else {
      console.log("good to go...");
      // console.log(partner, meal);

      const sendData = new FormData();
      sendData.append("firstName", partner.firstName);
      sendData.append("lastName", partner.lastName);
      sendData.append("phoneNumber", partner.phoneNumber);
      sendData.append("birthDate", partner.birthDate);
      sendData.append("gender", partner.gender);
      sendData.append("address", partner.address);
      sendData.append("email", partner.email);
      sendData.append("password", partner.password);
      sendData.append("verificationDoc", partner.verificationDoc);
      if (partner.photo) sendData.append("photo", partner.photo);

      sendData.append("name", meal.name);
      sendData.append("description", meal.description);
      sendData.append("isVeg", meal.mealType);
      if (meal.photo) sendData.append("photo", meal.photo);
      sendData.append("coreItems", JSON.stringify(meal.coreItems));
      sendData.append("fats", meal.fats);
      sendData.append("carbs", meal.carbs);
      sendData.append("protein", meal.protein);
      sendData.append("cholesterol", meal.cholesterol);
      sendData.append("brandName", partner.brandName);
      sendData.append("costPerMeal", partner.costPerMeal);
      console.log(...sendData);

      // call api to register partner
      axios
        .post(`${BASE_URL}/api/auth/register/partner`, sendData, {
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
    <div className={``}>
      {/* 
      {JSON.stringify(partner)}
      <br></br>
      {JSON.stringify(meal)}
      <br></br>
      {JSON.stringify(currentItem)}
      <br></br>
      {JSON.stringify(onStep2)} */}
      <div className="reg_head">
        <h1 className="reg_title">New Partner Registration</h1>
        <p className="reg_subtitle">
          Join us now and grow your business with us or join us to help
          distribute of free meals.
        </p>
        { loader==true && <Loader/>}
        <Progress
          status={onStep2}
          prog1Title="Partner Details"
          prog2Title="Create Meal"
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
                    required
                    type="text"
                    id="f_name"
                    placeholder=" "
                    value={partner.firstName}
                    onChange={(e) => {
                      setPartner({ ...partner, firstName: e.target.value });
                    }}
                  />
                  <label htmlFor="f_name">Owner First Name</label>
                </div>
                <div className="form_grp">
                  <input
                    required
                    type="text"
                    id="l_name"
                    placeholder=" "
                    value={partner.lastName}
                    onChange={(e) => {
                      setPartner({ ...partner, lastName: e.target.value });
                    }}
                  />
                  <label htmlFor="l_name">Owner Last Name</label>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    {...dobValdationProps}
                    required
                    type="Date"
                    id="birthDate"
                    placeholder=" "
                    value={partner.birthDate}
                    onChange={(e) => {
                      setPartner({ ...partner, birthDate: e.target.value });
                    }}
                  />
                  <label htmlFor="birthDate">Date Of Birth</label>
                </div>
                <div className="form_grp">
                  <select
                    required
                    className="select"
                    id="gender"
                    placeholder=" "
                    value={partner.gender}
                    onChange={(e) => {
                      setPartner({ ...partner, gender: e.target.value });
                    }}
                  >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                  <label htmlFor="gender">Gender</label>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    required
                    type="text"
                    id="brandName"
                    placeholder=" "
                    value={partner.brandName}
                    onChange={(e) => {
                      setPartner({ ...partner, brandName: e.target.value });
                    }}
                  />
                  <label htmlFor="brandName">Brand Name</label>
                </div>
                <div className="form_grp">
                  <div className={partner.isVolunteer && "form_grp_disabled"}>
                    <input
                      required
                      type="number"
                      id="cpm"
                      placeholder=" "
                      readOnly={partner.isVolunteer}
                      value={partner.costPerMeal}
                      onChange={(e) => {
                        setPartner({ ...partner, costPerMeal: e.target.value });
                      }}
                    />
                    <label htmlFor="cpm">Cost per Meal (&#8377;)</label>
                  </div>
                  <div>or</div>
                  <div>
                    <input
                      type="checkbox"
                      id="isVolunteer"
                      placeholder=" "
                      checked={partner.isVolunteer}
                      onChange={() => {
                        setPartner({
                          ...partner,
                          isVolunteer: !partner.isVolunteer,
                        });
                      }}
                      onClick={() => {
                        setPartner({ ...partner, costPerMeal: "" });
                      }}
                    />
                    <p>I want to be a volunteer</p>
                  </div>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    {...phNoValidationProps}
                    required
                    type="number"
                    id="phn"
                    placeholder=" "
                    value={partner.phoneNumber}
                    onChange={(e) => {
                      if (e.target.value?.length > 10) return;
                      setPartner({ ...partner, phoneNumber: e.target.value });
                    }}
                  />
                  <label htmlFor="phn">Phone</label>
                </div>
                <div className="form_grp">
                  <input
                    required
                    type="file"
                    id="profile"
                    accept={acceptedProfilePic}
                    onChange={(e) => {
                      setPartner({ ...partner, photo: e.target.files[0] });
                    }}
                  />
                  <label htmlFor="profile">Photo</label>
                  <AiOutlineUpload className="upload_icon" />
                </div>
              </div>

              <div className="form_row">
                <Address
                  value={partner.address}
                  className="form_grp"
                  handleChange={(val) =>
                    setPartner({ ...partner, address: val })
                  }
                />
                <div className="form_grp">
                  <input
                    required
                    type="file"
                    id="doc"
                    accept={acceptedDocs}
                    onChange={(e) => {
                      setPartner({
                        ...partner,
                        verificationDoc: e.target.files[0],
                      });
                    }}
                  />
                  <label htmlFor="doc">Verfication Document</label>
                  <AiOutlineUpload className="upload_icon" />
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    required
                    type="email"
                    id="email"
                    value={partner.email}
                    onChange={(e) => {
                      setPartner({ ...partner, email: e.target.value });
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
                    value={partner.password}
                    onChange={(e) => {
                      setPartner({ ...partner, password: e.target.value });
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
              <div className="form_row">
                <div className="form_grp">
                  <input
                    type="text"
                    id="meal_name"
                    placeholder=" "
                    value={meal.name}
                    onChange={(e) => {
                      setMeal({ ...meal, name: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="meal_name">Meal Name</label>
                </div>
                <div className="form_grp">
                  <select
                    required
                    className="select"
                    value={meal.mealType}
                    id="meal_type"
                    onChange={(e) => {
                      setMeal({ ...meal, mealType: e.target.value });
                    }}
                  >
                    <option value={true}>Veg</option>
                    <option value={false}>Non-Veg</option>
                  </select>
                  <label htmlFor="meal_type">Meal Type</label>
                </div>
              </div>
              <div className="form_row">
                <div className="form_grp">
                  <input
                    type="text"
                    id="meal_desc"
                    value={meal.description}
                    onChange={(e) => {
                      setMeal({ ...meal, description: e.target.value });
                    }}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="meal_desc">Meal Description</label>
                </div>
                <div className="form_grp">
                  <input
                    type="file"
                    id="meal_photo"
                    onChange={(e) => {
                      setMeal({ ...meal, photo: e.target.files[0] });
                    }}
                    required
                  />
                  <label htmlFor="meal_photo">Meal Photo</label>
                  <AiOutlineUpload className="upload_icon" />
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp">
                  <input
                    type="number"
                    id="fats"
                    placeholder=" "
                    value={meal.fats}
                    onChange={(e) => {
                      setMeal({ ...meal, fats: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="fats">Fats(g)</label>
                </div>
                <div className="form_grp">
                  <input
                    type="number"
                    id="carbs"
                    placeholder=" "
                    value={meal.carbs}
                    onChange={(e) => {
                      setMeal({ ...meal, carbs: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="carbs">Carbs(g)</label>
                </div>
                <div className="form_grp">
                  <input
                    type="number"
                    id="protein"
                    placeholder=" "
                    value={meal.protein}
                    onChange={(e) => {
                      setMeal({ ...meal, protein: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="protein">Protein(g)</label>
                </div>
                <div className="form_grp">
                  <input
                    type="number"
                    id="cholesterol"
                    placeholder=" "
                    value={meal.cholesterol}
                    onChange={(e) => {
                      setMeal({ ...meal, cholesterol: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="cholesterol">Cholesterol(g)</label>
                </div>
              </div>

              <div className="form_row">
                <div className="form_grp form_grp_full">
                  <input
                    type="text"
                    id="meal_item"
                    placeholder=" "
                    value={currentItem}
                    onChange={(e) => {
                      e.target.setCustomValidity("");
                      setCurrentItem(e.target.value);
                    }}
                  />
                  <label htmlFor="meal_item">Items</label>
                  <GrAdd className="add_btn" onClick={pushItem} />
                  <div className="item_list_container">
                    {meal.coreItems.map((item, key) => (
                      <div className="item" key={key}>
                        <p>{item}</p>
                        <AiOutlineClose
                          className="remove_icon"
                          onClick={() => {
                            removeItem(item);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
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

export default PartnerRegistration;
