import axios from "axios";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import InfoBox from "../components/common/InfoBox/index.js";
import Order from "../components/common/OrderCard/index";
import styles from "../components/Layout/layout.module.scss";
import { BASE_URL } from '../helper/utils.helper'

export default function AdminDashboardPage() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "Male",
    address: "",
    email: "",
  });
  const [funds, setFunds] = useState(0);
  const [res, setres] = useState([]);
  const [order, setOrder] = useState([]);
  const [users, setusers] = useState([]);
  const [userName, setuserName] = useState(false);
  const [edit, setEdit] = useState([]);
  const [editData, setEditData] = useState(false);
  const [FUND,setFUND]=useState([])

  let DonationsInfobox = [
    {
      titleName: "Total Users",
      totalPayment: `${users?.length}`,
    },
  ];

  let FundsInfobox = [
    {
      titleName: "Available Funds",
      totalPayment: "0",
    },
  ];

  let DonorsInfobox = [
    {
      titleName: "Total Orders",
      totalPayment: order?.length,
    },
  ];

  const router = useRouter();
  useEffect(() => {
    const _riderStore = localStorage.getItem("adminStore");

    if (_riderStore == null) {
      localStorage.setItem("riderStore", "[]");
      router.push("/login");
      return;
    }

    axios
      .get(`${BASE_URL}/api/org/`)
      .then((res) => {
        setFunds(res?.data?.org?.funds);
      })
      .catch((error) => {
        console.log(error);
        alert(error?.response?.data?.error || "Something went wrong!");
      });
  }, []);

  // let OrderHistory = [
  //   {
  //     imgSrc:
  //       "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  //     imgAlt: "image",
  //     mealName: "Veg Thali",
  //     partnerName: "xyz store",
  //     orderDate: "Ordered 18th Aug on 04:30pm",
  //     deliveryStatus: "Delivery",
  //     deliveryOrderDate: "Ordered 18th Aug on 04:30pm",
  //   },
  // ];

  // let FundData = [
  //   {
  //     id: 1,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 2,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 3,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 4,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 5,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 6,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 7,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 8,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 9,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 10,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "2000",
  //     Account: "7539514568232",
  //   },
  //   {
  //     id: 11,
  //     Date: "28-08-2022",
  //     DonorName: "Nilesh Bhardwaj",
  //     Email: "nileshrajbhar731@gmail.com",
  //     Phone: "7539514568",
  //     Address: "ghatkopar West",
  //     Amount: "200",
  //     Account: "7539514568232",
  //   },
  // ];
  //   let totalPayment = 0;
  //   FundData?.forEach((item) => {
  //     totalPayment += parseInt(item.Amount, 0);
  //   });
  //   console.log(totalPayment);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/order`).then((response) => {
      setOrder(response.data.order);
    });
    
    axios.get(`${BASE_URL}/api/order`).then((response) => {
      setOrder(response.data.order);
    });

    axios.get(`${BASE_URL}/api/auth/users`).then((response) => {
      setusers(response.data.users);
      console.log(response.data.users);
    });
    axios.get(`${BASE_URL}/api/org/donation`).then((response) => {
      setFUND(response.data.donation);
      console.log(response.data.donation);
    });
  }, []);

  const profileData = (e, role) => {
    console.log(e);
    axios
      .get(
        `${BASE_URL}/api/auth/user/${e}/${role?.[0]?.toUpperCase()}${role?.substr(
          1,
          role.length,
        )}`,
      )
      .then((response) => {
        // setres(response.data.users);
        console.log(response.data.id);
        setres(response.data.id);
      });
  };
  const profileEdit = (e) => {
    console.log(e);
    // axios
    // .get(`${BASE_URL}/api/auth/user/${e}`)
    // .then((response) => {
    //   // setres(response.data.users);
    //   console.log(response.data.id);
    //   setEdit(response.data.id);
    // });
  };
  const profileUpdate = (e) => {
    console.log(e);
    // axios
    // .get(`${BASE_URL}/api/auth/user/${e}`)
    // .then((response) => {
    //   // setres(response.data.users);
    //   console.log(response.data.id);
    //   setEdit(response.data.id);
    // });
  };

  let id = 1;
  let findId=1

  let OrderHistory = order;
  console.log(OrderHistory);
  
  let FundData = FUND;

  let MemberDetails = users;

  return (
    <div className="dashboard">
      <div className="Infobox">
        {DonationsInfobox?.map((e) => {
          return (
            <>
              <InfoBox titleName={e.titleName} totalPayment={e.totalPayment} />
            </>
          );
        })}

        {FundsInfobox?.map((e) => {
          return (
            <>
              <InfoBox
                titleName={e.titleName}
                totalPayment={`${funds || 0}₹`}
              />
            </>
          );
        })}

        {DonorsInfobox?.map((e) => {
          return (
            <>
              <InfoBox titleName={e.titleName} totalPayment={e.totalPayment} />
            </>
          );
        })}
      </div>

      <h1>Fund Data</h1>
      <table className="customers">
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Donor Name</th> */}
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {FundData?.length ? (
            FundData?.map((e) => {
              return (
                <>
                  <tr key={e?.id}>
                    <td>{findId++}</td>
                    {/* <td>{e?.Name}</td> */}
                    <td>{e?.email}</td>
                    <td>{e?.contact}</td>
                    <td>{e?.Address}</td>
                    <td>{e?.amount}</td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan="8">no data found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h1>Member Details</h1>
      <table className="customers">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>isVerified</th>
            <th>gender</th>
            <th>phoneNumber</th>
            <th>address</th>
            <th>userRole</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {MemberDetails?.length ? (
            MemberDetails?.map((e) => {
              return (
                <>
                  <tr key={e?.id}>
                    <td>{id++}</td>
                    <td>
                      {e?.firstName} {e?.lastName}
                    </td>
                    <td>{e?.isVerified ? "Verified" : "Not Verified"}</td>
                    <td>{e?.gender}</td>
                    <td>{e?.phoneNumber}</td>
                    <td>{e?.address}</td>
                    <td>{e?.userRole}</td>
                    <td>
                      <button
                        className="btn btn-primary btnShort"
                        type="button"
                        onClick={() => {
                          profileData(e?._id, e?.userRole);
                          setuserName(true);
                        }}
                      >
                        view
                      </button>
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan="8">no data found</td>
            </tr>
          )}
        </tbody>
      </table>

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
                <figcaption>
                  <h2>
                    {res.firstName} <span>{res.lastName}</span>
                  </h2>
                  <p>{res.email}</p>
                  <p>{res.phoneNumber}</p>
                  <p>{res.gender}</p>

                  <div className={`${styles.updateStatus}`}>
                    <div>
                      <input
                        type="checkbox"
                        id="isVerified"
                        placeholder=" "
                        checked={res?.isVerified}
                        onChange={(e) => {
                          setres({ ...res, isVerified: e.target.checked });
                        }}
                      />
                      <span>isVerified</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="isActive"
                        placeholder=" "
                        checked={res?.isActive}
                        onChange={(e) => {
                          setres({ ...res, isActive: e.target.checked });
                        }}
                      />
                      <span>isActive</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        console.log(res);
                        axios
                          .post(
                            `${BASE_URL}/api/auth/user/${res?._id}`,
                            res,
                          )
                          .then((res) => {
                            console.log(res);
                            alert("User Updated");
                            window.location.reload();
                          })
                          .catch((error) => {
                            console.log(error);
                            alert(
                              error?.response?.data?.error ||
                                "Something went wrong!",
                            );
                          });
                        // profileEdit(res?._id);
                        // setuserName(false);
                        // setEditData(true);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </figcaption>
                <img
                  src={
                    res.photoUrl
                      ? `${BASE_URL}${res.photoUrl}`
                      : "/images/default.jpg"
                  }
                  alt={res.photoUrl}
                />
                <div className={`${styles.position}`}>{res.birthDate}</div>
              </figure>
            </div>
          </div>
        </>
      ) : null}
      {editData ? (
        <>
          {/* <form> */}
          <div className={`${styles.conatiner_popup}`}>
            <div className={`${styles.container_main_popup}`}>
              <button
                className={`${styles.btn_main}`}
                onClick={() => setEditData(false)}
              >
                X
              </button>
              <div className={`${styles.editFormContatiner} form_container`}>
                <div className="form_row">
                  <div className="form_grp">
                    <div>
                      <input
                        type="checkbox"
                        id="isVerified"
                        placeholder=" "
                        // checked={partner.isVolunteer}
                        // onChange={() => {
                        //   setPartner({
                        //     ...partner,
                        //     isVolunteer: !partner.isVolunteer,
                        //   });
                        // }}
                        // onClick={() => {
                        //   setPartner({ ...partner, costPerMeal: "" });
                        // }}
                      />
                      <p>isVerified</p>
                    </div>
                  </div>
                  <div className="form_grp">
                    <div>
                      <input
                        type="checkbox"
                        id="isVerified"
                        placeholder=" "
                        // checked={partner.isVolunteer}
                        // onChange={() => {
                        //   setPartner({
                        //     ...partner,
                        //     isVolunteer: !partner.isVolunteer,
                        //   });
                        // }}
                        // onClick={() => {
                        //   setPartner({ ...partner, costPerMeal: "" });
                        // }}
                      />
                      <p>isVerified</p>
                    </div>
                  </div>
                </div>

                <div className="form_row">
                  {/* <div className="form_grp">
                    <input
                      type="text"
                      id="f_name"
                      placeholder=" "
                      required
                      value={res.firstName}
                      onChange={(e) =>
                        setres({ ...res, firstName: e.target.value })
                      }
                    />
                    <label htmlFor="f_name">First Name</label>
                  </div> */}
                  {/* <div className="form_grp">
                    <input
                      type="text"
                      id="l_name"
                      placeholder=" "
                      required
                      value={res.lastName}
                      onChange={(e) =>
                        setData({ ...res, lastName: e.target.value })
                      }
                    />
                    <label htmlFor="l_name">Last Name</label>
                  </div> */}
                </div>

                <div className="form_row">
                  {/* <div className="form_grp">
                    <input
                      type="number"
                      id="phn"
                      placeholder=" "
                      required
                      min={1000000000}
                      max={9999999999}
                      value={res.phoneNumber}
                      onChange={(e) => {
                        if (e.target.value?.length > 10) return;
                        setData({ ...res, phoneNumber: e.target.value });
                      }}
                    />
                    <label htmlFor="phn">Phone</label>
                  </div>
                  <div className="form_grp">
                    <input
                      type="text"
                      id="gender"
                      placeholder=" "
                      required
                      value={res.gender}
                      onChange={(e) =>
                        setData({ ...res, gender: e.target.value })
                      }
                    />
                    <label htmlFor="gender">Gender</label>
                  </div> */}
                </div>

                <div className="form_row">
                  {/* <div className="form_grp">
                    <input
                      type="text"
                      id="dob"
                      placeholder=" "
                      required
                      // max={
                      //   new Date(
                      //     new Date().setFullYear(new Date().getFullYear() - 5),
                      //   )
                      //     .toISOString()
                      //     .split("T")[0]
                      // }
                      value={res.birthDate}
                      onChange={(e) =>
                        setData({ ...res, birthDate: e.target.value })
                      }
                    />
                    <label htmlFor="dob">Date of Birth</label>
                  </div> */}
                </div>

                <div className="form_row">
                  {/* <div className="form_grp">
                    <input
                      type="text"
                      id="address"
                      placeholder=" "
                      required
                      value={res.address}
                      onChange={(e) =>
                        setData({ ...res, address: e.target.value })
                      }
                    />
                    <label htmlFor="address">Address</label>
                  </div> */}
                </div>

                <div className="form_row">
                  {/* <div className="form_grp">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      required
                      value={res.email}
                      onChange={(e) =>
                        setData({ ...res, email: e.target.value })
                      }
                    />
                    <label htmlFor="email">Email</label>
                  </div> */}
                </div>

                <button
                  type="submit"
                  className="btn btn_success"
                  onClick={() => profileUpdate(res)}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
          {/* // </form> */}
        </>
      ) : null}

      <h1>Order History</h1>
      <div className="orderHistory">
        {OrderHistory?.length ? (
          OrderHistory?.map((e) => {
            return (
              <>
                <Order
                  imgSrc={`${BASE_URL}${e?.mealId?.photoUrl}`}
                  imgAlt={e?.mealId?.photoUrl}
                  mealName={e?.mealId?.name}
                  partnerName={
                    e?.preparedBy?.userRoleId?.brandName
                      ? e?.preparedBy?.userRoleId?.brandName
                      : "N/A"
                  }
                  orderDate={new Date(e?.createdAt).toLocaleString()}
                  deliveryStatus={e?.status}
                  deliveryOrderDate={new Date(e?.updatedAt).toLocaleString()}
                />
              </>
            );
          })
        ) : (
          <div className="noDataFound">No Order History Present</div>
        )}
      </div>
    </div>
  );
}
