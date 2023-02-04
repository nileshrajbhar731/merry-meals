import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BigInfoCard from "../components/common/BigInfoCard/index.js";
import Card from "../components/common/Card/index.js";
import LongCard from "../components/common/LongCard/index";
import Order from "../components/common/OrderCard/index";
import { BASE_URL, ORDER_STATUS } from "../helper/utils.helper.js";
export default function RiderDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [partnerData, setPartnerData] = useState(null);

  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [availableDeliveries, setAvailableDeliveries] = useState([]);


  const [riderStore, setriderStore] = useState([]);
  // api call riderDetails

  const router = useNavigate();
  useEffect(() => {
    axios.get(`${BASE_URL}/api/order`).then((response) => {
      setOrders(response?.data?.order);
    });

    function listenStorageChange() {
      const _riderStore = localStorage.getItem("riderStore");

      if (_riderStore == null) {
        localStorage.setItem("riderStore", "[]");
        router("/login");
      }
      if (!JSON.parse(_riderStore)?._id) router("/login");
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
        `${BASE_URL}/api/auth/user/${riderStore?.userRoleId?.partnerId}/Partner`
      )
      .then((response) => {
        setPartnerData(response?.data?.id);
        console.log(response);
      });

    setSelectedDeliveries(
      orders?.filter(
        (order) =>
          order?.status === ORDER_STATUS[3] &&
          order?.deliveredBy?.userRoleId === riderStore?.userRoleId?._id
      )
    );
    setAvailableDeliveries(
      orders?.filter((order) => order?.status === ORDER_STATUS[2])
    );
    setOrderHistory(
      orders?.filter(
        (order) => order?.deliveredBy?._id === riderStore?._id

      )
    );
  }, [orders, riderStore?.userRoleId?.partnerId]);

  console.log(partnerData);
  // console.log(riderStore._id);



  return (
    <div className="dashboard">
      <h1>Selected Delivery</h1>
      <div className="selectedMeals">
        {selectedDeliveries?.length ? (
          selectedDeliveries?.map((e, key) => {
            console.log(e);
            if (e?.deliveredBy?.userRoleId !== riderStore?.userRoleId?._id)
              return null;
            return (
              <>
                <LongCard
                  key={key}
                  imgSrc={`${BASE_URL}${e?.mealId?.["photoUrl"]}`}
                  imgAlt={e.mealId?.["photoUrl"]}
                  mealName={e.mealId?.["name"]}
                  // partnerName={}
                  coreItems={e.mealId?.coreItems}
                  btnTitle="Accept Request"
                  order={new Date(e?.createdAt).toLocaleString()}
                  hideBtn={true}
                  updateStatus={e?.status}
                />
              </>
            );
          })
        ) : (
          <div className="noDataFound">No Orders Selected</div>
        )}
      </div>


      <h1>Avilable Meals For Delivery</h1>
      <div className="availableMeals row">
        {console.log(availableDeliveries)}
        {availableDeliveries?.length ? (
          availableDeliveries?.map((e, key) => {
            console.log(e);
            // console.log(partnerStore?.userRoleId?.rider?.length);
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
    </div>
  );
}
