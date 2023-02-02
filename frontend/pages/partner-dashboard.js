import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/common/Card/index.js";
import Circle from "../components/common/Circle/index";
import LongCard from "../components/common/LongCard/index";
import Order from "../components/common/OrderCard/index";
import { BASE_URL, ORDER_STATUS } from "../helper/utils.helper.js";
import { useRouter } from "next/router";

export default function PartnerDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [partnerStore, setpartnerStore] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);

  const router = useRouter();
  // api call PartnerDetails

  useEffect(() => {
    axios.get(`${BASE_URL}/api/order`).then((response) => {
      setOrders(response?.data?.order);
      // console.log(response?.data?.order);
    });

    function listenStorageChange() {
      const _partnerStore = localStorage.getItem("partnerStore");

      if (_partnerStore == null) {
        localStorage.setItem("partnerStore", "[]");
        router.push("/login");
      }
      if (!JSON.parse(_partnerStore)?._id) router.push("/login");
      setpartnerStore(JSON.parse(_partnerStore));
    }

    listenStorageChange();

    window.addEventListener("storage", listenStorageChange);
  }, []);

  useEffect(() => {
    if (!partnerStore?._id) return;
    // console.log(orders);

    setSelectedOrders(
      orders?.filter((order) => order?.status === ORDER_STATUS[1])
    );
    setAvailableOrders(
      orders?.filter((order) => order?.status === ORDER_STATUS[0])
    );
    setOrderHistory(
      orders?.filter(
        (order) =>
          order?.preparedBy?._id === partnerStore?._id &&
          order?.status !== ORDER_STATUS[1]
      )
    );
  }, [orders, partnerStore]);

  return (
    <div className="dashboard">
      <h1>Selected Meals</h1>
      <div className="selectedMeals">
        {selectedOrders?.length ? (
          selectedOrders?.map((e, key) => {
            return (
              <>
                <LongCard
                  key={key}
                  imgSrc={`${BASE_URL}${e?.mealId?.["photoUrl"]}`}
                  imgAlt={e.mealId?.["photoUrl"]}
                  mealName={e.mealId?.["name"]}
                  partnerName={name}
                  coreItems={e.mealId?.coreItems}
                  btnTitle="Accept Request"
                  order={new Date(e?.createdAt).toLocaleString()}
                  btnValue="Meal Prepared"
                  btnFn={() => {
                    const sendData = {
                      _id: e?._id,
                      preparedBy: partnerStore?._id,
                      status: ORDER_STATUS[2],
                    };

                    console.log(sendData);
                    alert(JSON.stringify(sendData));

                    // return;
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
                            "Something went wrong!"
                        );
                      });
                  }}
                  updateStatus={e?.status}
                />
              </>
            );
          })
        ) : (
          <div className="noDataFound">No Orders Selected</div>
        )}
      </div>

      <h1>Avilable Meals Requests</h1>
      <div className="availableMeals row">
        {availableOrders?.length ? (
          availableOrders?.map((e, key) => {
            {
              /* console.log(e.orderBy); */
            }
            {
              /* console.log(partnerStore?.userRoleId?.rider?.length); */
            }
            const name = e.orderBy["firstName"] + " " + e.orderBy["lastName"];

            return (
              <div>
                <Card
                  key={key}
                  imgSrc={`${BASE_URL}${e.mealId["photoUrl"]}`}
                  imgAlt={e.mealId["photoUrl"]}
                  mealName={e.mealId["name"]}
                  partnerName={name}
                  coreItems={e.mealId?.coreItems}
                  btnTitle="Accept Request"
                  isDisabled={
                    !!selectedOrders?.length ||
                    partnerStore?.userRoleId?.riders?.length < 2
                  }
                  btnFn={() => {
                    const sendData = {
                      _id: e?._id,
                      preparedBy: partnerStore?._id,
                      totalCost: partnerStore?.userRoleId?.costPerMeal,
                      status: ORDER_STATUS[1],
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
                            "Something went wrong!"
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

      <h1>Avilable Riders</h1>
      <div
        className={`riders ${
          partnerStore?.userRoleId?.riders?.length ? "row" : ""
        }`}
      >
        {console.log(partnerStore)}
        {partnerStore?.userRoleId?.riders?.length ? (
          partnerStore?.userRoleId?.riders?.map((e, key) => {
            return (
              <div>
                <Circle
                  key={key}
                  imgSrc={`${BASE_URL}${e.photoUrl}`}
                  imgAlt={e.photoUrl}
                  riderName={e.firstName}
                />
              </div>
            );
          })
        ) : (
          <p className="noDataFound">No Riders Available</p>
        )}
      </div>

      <h1>Order History</h1>
      <div className="orderHistory">
        {orderHistory?.length == 0 ? (
          <div className="noDataFound">No Data Found</div>
        ) : (
          <>
            {orderHistory?.map((e, key) => {
              return (
                <>
                  <Order
                    key={key}
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
    </div>
  );
}
