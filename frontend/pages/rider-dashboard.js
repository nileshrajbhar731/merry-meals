import axios from "axios";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import BigInfoCard from "../components/common/BigInfoCard/index.js";
import Card from "../components/common/Card/index.js";
import LongCard from "../components/common/LongCard/index";
import Order from "../components/common/OrderCard/index";
import { BASE_URL, ORDER_STATUS } from "../helper/utils.helper.js";
export default function RiderDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [partnerStore, setpartnerStore] = useState([]);
  const [partnerData, setPartnerData] = useState(null);

  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [availableDeliveries, setAvailableDeliveries] = useState([]);

  let SelectedDelivery = [
    {
      imgSrc:
        "https://www.sundayguardianlive.com/wp-content/uploads/2020/07/3-Dib-restaurant-losses-edited.jpg",
      imgAlt: "RiderLongCard",
      mealName: "Veg Thali",
      mealId: "8",
      partnerName: "Nilesh Bhardwaj, Mumbai",
      address: "33 Datattary Chal no 7b indira ngr ghatkopar west mumabi-86",
      order: "Accepted 18th Aug on 04:30pm",
      btnValue: "Delivery",
      updateStatus: "Update Status",
    },
  ];

  let AvilableMealsForDelivery = [
    {
      imgSrc:
        "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
      imgAlt: "image",
      mealName: "Veg",
      mealId: "1",
      partnerName: "xyz store",
      btnValue: "Accept Request",
    },
    {
      imgSrc:
        "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
      imgAlt: "image",
      mealName: "Veg",
      mealId: "2",
      partnerName: "xyz store",
      btnValue: "Accept Request",
    },
    {
      imgSrc:
        "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
      imgAlt: "image",
      mealName: "Veg",
      mealId: "3",
      partnerName: "xyz store",
      btnValue: "Accept Request",
    },
    {
      imgSrc:
        "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
      imgAlt: "image",
      mealName: "Veg",
      mealId: "4",
      partnerName: "xyz store",
      btnValue: "Accept Request",
    },
  ];

  let YourPartberDetails = [
    {
      imgSrc:
        "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/10/381328-Paleo-meal-delivery-review-1296x728-Header-66d2ed-1024x575.jpg?w=1155&h=1528",
      imgAlt: "image",
      partnerName: "XYZ Foundation",
      address:
        "consectetur adipiscing elit, sed do eiusmod tempor, laboreet dolore, Mumbai",
    },
  ];

  const [res, setres] = useState([]);
  const [riderStore, setriderStore] = useState([]);
  // api call riderDetails

  const router = useRouter();
  useEffect(() => {
    axios.get(`${BASE_URL}/api/order`).then((response) => {
      setOrders(response?.data?.order);
    });

    function listenStorageChange() {
      const _riderStore = localStorage.getItem("riderStore");

      if (_riderStore == null) {
        localStorage.setItem("riderStore", "[]");
        router.push("/login");
      }
      if (!JSON.parse(_riderStore)?._id) router.push("/login");
      setriderStore(JSON.parse(_riderStore));
      console.log(JSON.parse(_riderStore));
    }
    listenStorageChange();

    window.addEventListener("storage", listenStorageChange);
  }, []);

  console.log(orders);

  useEffect(() => {
    console.log(riderStore?.userRoleId);
    if (!riderStore?._id) return;
    if (!riderStore?.userRoleId?.partnerId) return;
    // console.log(orders);

    axios
      .get(
        `${BASE_URL}/api/auth/user/${riderStore?.userRoleId?.partnerId}/Partner`,
      )
      .then((response) => {
        setPartnerData(response?.data?.id);
        console.log(response);
      });

    setSelectedDeliveries(
      orders?.filter((order) => order?.status === ORDER_STATUS[3] && order?.deliveredBy?.userRoleId === riderStore?.userRoleId?._id) ,
    );
    setAvailableDeliveries(
      orders?.filter((order) => order?.status === ORDER_STATUS[2]),
    );
    setOrderHistory(
      orders?.filter(
        (order) => order?.deliveredBy?._id === riderStore?._id,
        // &&
        // order?.status !== ORDER_STATUS[3],
      ),
    );
  }, [orders, riderStore?.userRoleId?.partnerId]);

  console.log(partnerData);
  // console.log(riderStore._id);

  const myArrayFiltered = res.filter((el) => {
    return [riderStore].some((f) => {
      return f._id === el?.preparedBy?._id;
    });
  });

  // console.log(myArrayFiltered);
  let OrderHistory = myArrayFiltered;

  //function to set delivery for this rider
  const setMealForDelivery = (mealId) => {
    // call api
    alert("Selected Delivery Updated to mealId - " + mealId);
  };

  const updateDeliveryStatus = (selectedMeal) => {
    // call api to update the status
    alert("Status Updated for mealId- " + selectedMeal.mealId);
  };

  return (
    <div className="dashboard">
      <h1>Selected Delivery</h1>
      <div className="selectedMeals">
        {selectedDeliveries?.length ? (
          selectedDeliveries?.map((e) => {
             console.log(e,riderStore);
             if(e?.deliveredBy?.userRoleId !== riderStore?.userRoleId?._id)return null
            return (
              <>
                <LongCard
                  imgSrc={`${BASE_URL}${e?.mealId?.["photoUrl"]}`}
                  imgAlt={e.mealId?.["photoUrl"]}
                  mealName={e.mealId?.["name"]}
                  partnerName={name}
                  coreItems={e.mealId?.coreItems}
                  btnTitle="Accept Request"
                  order={new Date(e?.createdAt).toLocaleString()}
                  hideBtn={true}
                  // btnValue="Meal Prepared"
                  // btnFn={() => {
                  //   const sendData = {
                  //     _id: e?._id,
                  //     status: ORDER_STATUS[2],
                  //   };

                  //   console.log(sendData);
                  //   return;
                  //   // return;
                  //   axios
                  //     .post("http://localhost:5000/api/order/update", sendData)
                  //     .then((res) => {
                  //       console.log(res);
                  //       window.location.reload();
                  //     })
                  //     .catch((error) => {
                  //       console.log(error);
                  //       alert(
                  //         error?.response?.data?.error ||
                  //           "Something went wrong!",
                  //       );
                  //     });
                  // }}
                  updateStatus={e?.status}
                />
              </>
            );
          })
        ) : (
          <div className="noDataFound">No Orders Selected</div>
        )}
      </div>

      {/* <section className="dashboard-section">
        <h1>Selected Delivery</h1>
        {SelectedDelivery?.map((e) => {
          return (
            <>
              <LongCard
                imgSrc={e.imgSrc}
                imgAlt={e.imgAlt}
                mealName={e.mealName}
                partnerName={e.partnerName}
                address={e.address}
                order={e.order}
                btnValue={e.btnValue}
                updateStatus={e.updateStatus}
                btnFn={() => {
                  updateDeliveryStatus(e);
                }}
              />
            </>
          );
        })}
      </section> */}

      <h1>Avilable Meals For Delivery</h1>
      <div className="availableMeals row">
      {
        console.log(availableDeliveries)
      }
        {availableDeliveries?.length ? (
          availableDeliveries?.map((e) => {
            console.log(e);
            // console.log(partnerStore?.userRoleId?.rider?.length);
            const name = e.orderBy["firstName"] + " " + e.orderBy["lastName"];
            return (
              <div>
                <Card
                  imgSrc={`${BASE_URL}${e.mealId["photoUrl"]}`}
                  imgAlt={e.mealId["photoUrl"]}
                  mealName={e.mealId["name"]}
                  partnerName={name}
                  coreItems={e.mealId?.coreItems}
                  btnTitle="Pickup Order"
                  isDisabled={!!selectedDeliveries?.length}
                  btnFn={() => {
                    const sendData = {
                      _id: e?._id,
                      preparedBy: e?.preparedBy?._id,
                      deliveredBy: riderStore?._id,
                      totalCost:
                        (e?.totalCost || 0) +
                        (riderStore?.userRoleId?.costPerRide || 0),
                      status: ORDER_STATUS[3],
                    };

                    alert(JSON.stringify(sendData));

                    axios
                      .post(`${BASE_URL}/api/order/update`, sendData)
                      .then((res) => {
                        console.log(res);
                        window.location.reload();
                      })
                      .catch((error) => {
                        console.log(error);
                        alert(
                          error?.response?.data?.error ||
                            "Something went wrong!",
                        );
                      });
                    // console.log("accept req", sendData);
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="noDataFound">No Data Found</div>
        )}
      </div>

      {/* <section className="dashboard-section">
        <h1>Avilable Meals For Delivery</h1>
        <div className="flex-container">
          {AvilableMealsForDelivery?.map((e) => {
            return (
              <>
                <Card
                  imgSrc={e.imgSrc}
                  imgAlt={e.imgAlt}
                  mealName={e.mealName}
                  partnerName={e.partnerName}
                  btnValue={e.btnValue}
                  btnFn={() => {
                    {
                      SelectedDelivery.length === 0
                        ? setMealForDelivery(e.mealId)
                        : alert(
                            "Please complete the delivery to select next delivery",
                          );
                    }
                  }}
                />
              </>
            );
          })}
        </div>
      </section> */}

      <section className="dashboard-section">
        <h1>Your Partner Details</h1>
        <div className=" selectedMeals row">
          <BigInfoCard
            imgSrc={`${BASE_URL}${partnerData?.photoUrl}`}
            imgAlt={partnerData?.photoUrl}
            partnerName={partnerData?.firstName + " " + partnerData?.lastName}
            address={partnerData?.address}
          />
        </div>
      </section>

      <h1>Order History</h1>
      <div className="orderHistory">
        {console.log(orderHistory)}
        {orderHistory?.length == 0 ? (
          <div className="noDataFound">No Data Found</div>
        ) : (
          <>
            {orderHistory?.map((e) => {
              console.log(e);
              return (
                <>
                  <Order
                    imgSrc={`${BASE_URL}${e.mealId["photoUrl"]}`}
                    imgAlt={e?.mealId["photoUrl"]}
                    mealName={e?.mealId["name"]}
                    partnerName={e?.partnerName}
                    orderDate={e?.createdAt}
                    deliveryStatus={e?.status}
                    deliveryOrderDate={e?.updatedAt}
                  />
                </>
              );
            })}
          </>
        )}
      </div>

      {/* <section className="dashboard-section">
        <h1>Order History</h1>
        {myArrayFiltered.length == 0 ? (
          <>not found</>
        ) : (
          <>
            {OrderHistory?.map((e) => {
              return (
                <>
                  <Order
                    imgSrc={e.mealId["photoUrl"]}
                    imgAlt={e.mealId["photoUrl"]}
                    mealName={e.mealId["name"]}
                    partnerName={e.partnerName}
                    orderDate={e.createdAt}
                    deliveryStatus={e.status}
                    deliveryOrderDate={e.updatedAt}
                  />
                </>
              );
            })}
          </>
        )}
      </section> */}
    </div>
  );
}
