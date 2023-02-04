import axios from "axios";

import { useEffect, useState } from "react";
import InfoBox from "../components/common/InfoBox/index.js";
import Order from "../components/common/OrderCard/index";
import styles from "../components/Layout/layout.module.css";
import { BASE_URL } from "../helper/utils.helper";

export default function AdminDashboardPage() {
  const [funds, setFunds] = useState(0);
  const [res, setres] = useState([]);
  const [order, setOrder] = useState([]);
  const [users, setusers] = useState([]);
  const [userName, setuserName] = useState(false);
  const [FUND, setFUND] = useState([]);

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

  useEffect(() => {
    const _riderStore = localStorage.getItem("adminStore");

    if (_riderStore == null) {
      localStorage.setItem("adminStore", "[]");
      window.location.href = "/login";
      // router("/login");
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

  useEffect(() => {
    axios.get(`${BASE_URL}/api/order`).then((response) => {
      setOrder(response.data.order);
    });

    axios.get(`${BASE_URL}/api/order`).then((response) => {
      setOrder(response.data.order);
    });

    axios.get(`${BASE_URL}/api/auth/users`).then((response) => {
      setusers(response.data.users);
      // console.log(response.data.users);
    });
    axios.get(`${BASE_URL}/api/org/donation`).then((response) => {
      setFUND(response.data.donation);
      // console.log(response.data.donation);
    });
  }, []);

  const profileData = (e, role) => {
    console.log(e);
    axios
      .get(
        `${BASE_URL}/api/auth/user/${e}/${role?.[0]?.toUpperCase()}${role?.substr(
          1,
          role.length
        )}`
      )
      .then((response) => {
        // console.log(response.data.id);
        setres(response.data.id);
      });
  };

  let id = 1;
  let findId = 1;

  let OrderHistory = order;
  // console.log(OrderHistory);

  let FundData = FUND;

  let MemberDetails = users;

  return (
    <div className="dashboard">
      <div className="Infobox">
        {DonationsInfobox?.map((e,key) => {
          return (
            <div key={key}>
              <InfoBox titleName={e.titleName} totalPayment={e.totalPayment} />
            </div>
          );
        })}

        {FundsInfobox?.map((e,key) => {
          return (
            <div key={key}>
              <InfoBox
                titleName={e.titleName}
                totalPayment={`${funds || 0}₹`}
              />
            </div>
          );
        })}

        {DonorsInfobox?.map((e,key) => {
          return (
            <div key={key}>
              <InfoBox titleName={e.titleName} totalPayment={e.totalPayment} />
            </div>
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
            FundData?.map((e,key) => {
              return (
                <>
                  <tr key={key}>
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
            MemberDetails?.map((e,key) => {
              return (
                <>
                  <tr key={key}>
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
                          .post(`${BASE_URL}/api/auth/user/${res?._id}`, res)
                          .then((res) => {
                            console.log(res);
                            alert("User Updated");
                            window.location.reload();
                          })
                          .catch((error) => {
                            console.log(error);
                            alert(
                              error?.response?.data?.error ||
                                "Something went wrong!"
                            );
                          });
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

      <h1>Order History</h1>
      <div className="orderHistory">
        {OrderHistory?.length ? (
          OrderHistory?.map((e,key) => {
            return (
              <div key={key}>
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
              </div>
            );
          })
        ) : (
          <div className="noDataFound">No Order History Present</div>
        )}
      </div>
    </div>
  );
}
