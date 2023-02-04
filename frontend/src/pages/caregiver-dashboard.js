import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/common/Card/index.js";
import Order from "../components/common/OrderCard/index";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { BASE_URL, ORDER_STATUS } from "../helper/utils.helper.js";
import ScheduleCard from "../components/common/ScheduleCard.js";

export default function CaregiverDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [caregiverStore, setcaregiverStore] = useState([]);
  const [meals, setMeals] = useState([]);
  const [mealKm, setMealKm] = useState("9");
  const dayMapping = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };
  const [currentDay, setCurrentDay] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  //modal
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  function toggleMealModal() {
    setIsMealModalOpen(!isMealModalOpen);
  }

  // api call caregiverDetails
  useEffect(() => {
    setCurrentDay(dayMapping[new Date().getDay()]);

    axios.get(`${BASE_URL}/api/order`).then((response) => {
      setOrders(response.data.order);
    });

    // meal
    axios.get(`${BASE_URL}/api/partner`).then((response) => {
      // console.log(response.data.partner);
      setMeals(response.data.partner);
    });
  }, []);

  useEffect(() => {
    const caregiverStore = localStorage.getItem("caregiverStore");
    if (caregiverStore == null) {
      localStorage.setItem("caregiverStore", "[]");
    }
    setcaregiverStore(JSON.parse(caregiverStore));
  }, [meals]);

  // console.log(res);
  // console.log(caregiverStore._id);

  // console.log(res)

  const myArrayFiltered = orders.filter((el) => {
    return [caregiverStore].some((f) => {
      console.log(el);
      return f._id === el?.orderFor?._id;
    });
  });

  // console.log(myArrayFiltered);

  const todayOrder =
    orders.filter((el) => {
      return [caregiverStore].some((f) => {
        return (
          f._id === el?.orderFor?._id &&
          new Date(el?.createdAt)?.toLocaleDateString() ===
            new Date()?.toLocaleDateString()
        );
      });
    })?.[0] || null;

  // console.log(todayOrder);

  let OrderHistory = myArrayFiltered;
  // console.log(OrderHistory);
  let AvilableMeals = meals;

  return (
    <div className="dashboard">
      <h1>Weekly Schedule</h1>
      <div className="weekSchedule-container">
        {caregiverStore?.userRoleId?.weekSchedule && (
          <>
            {caregiverStore?.userRoleId?.weekSchedule?.map((schedule, key) => {
              return (
                <ScheduleCard
                  key={key}
                  weekDay={schedule.day}
                  mealTitle={meals.map((meal) => {
                    if (schedule?.mealId === meal?.mealId?._id) {
                      return meal?.mealId?.name;
                    }
                  })}
                  partner={
                    schedule.mealId &&
                    meals.map((meal) => {
                      if (schedule?.mealId === meal?.mealId?._id) {
                        return meal?.brandName;
                      }
                    })
                  }
                  btnTitle={schedule.mealId ? "+ Update Meal" : "Select Meal"}
                  selectMeal={() => {
                    setSelectedDay(schedule.day);
                    toggleMealModal();
                  }}
                  orderNow={
                    <>
                      {currentDay === schedule.day && (
                        <>
                          {todayOrder ? (
                            <>
                              {todayOrder?.status === ORDER_STATUS[3] ? (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn_success"
                                    onClick={() => {
                                      const sendData = {
                                        _id: todayOrder?._id,
                                        preparedBy: todayOrder?.preparedBy?._id,
                                        deliveredBy:
                                          todayOrder?.deliveredBy?._id,
                                        isPartnerPaid: true,
                                        isRiderPaid: true,
                                        status: ORDER_STATUS[4],
                                      };

                                      alert(JSON.stringify(sendData));

                                      axios
                                        .post(`${BASE_URL}/api/org/update`, {
                                          addAmount: -todayOrder?.totalCost,
                                        })
                                        .then((res) => {
                                          // console.log(res);
                                        })
                                        .catch((error) => {
                                          console.log(error);
                                          alert(
                                            error?.response?.data?.error ||
                                              "Something went wrong!"
                                          );
                                        });
                                      axios
                                        .post(
                                          `${BASE_URL}/api/order/update`,
                                          sendData
                                        )
                                        .then((res) => {
                                          // console.log(res);
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
                                    Delivered
                                  </button>
                                </>
                              ) : (
                                <>
                                  <p>Order Status:</p>
                                  <h4>{todayOrder?.status}</h4>
                                </>
                              )}
                            </>
                          ) : (
                            <button
                              type="button"
                              className="btn btn_success"
                              onClick={() => {
                                const sendData = {
                                  mealId: schedule.mealId,
                                  orderBy: caregiverStore._id,
                                  orderFor: caregiverStore._id,
                                  totalCost: 0,
                                  isPartnerPaid: false,
                                  isRiderPaid: false,
                                  isFrozenMeal: false,
                                  status: ORDER_STATUS[0],
                                };

                                axios
                                  .post(`${BASE_URL}/api/order/post`, sendData)
                                  .then((res) => {
                                    // console.log(res);
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
                              Order Now
                            </button>
                          )}
                        </>
                      )}
                    </>
                  }
                />
              );
            })}
          </>
        )}
      </div>

      <h1>Avilable Meals</h1>
      <div className="availableMeals row">
        {AvilableMeals?.length ? (
          AvilableMeals?.map((e) => {
            return (
              <>
                <Card
                  imgSrc={`${BASE_URL}${e.mealId["photoUrl"]}`}
                  imgAlt={e.mealId["photoUrl"]}
                  mealName={e.mealId["name"]}
                  partnerName={e.brandName}
                  coreItems={e.mealId["coreItems"]}
                  hideBtn={true}
                  isFrozenMeal={mealKm >= 10}
                  showMealType={true}

                />
              </>
            );
          })
        ) : (
          <div className="noDataFound">No Data Found</div>
        )}
      </div>

      <h1>Order History</h1>
      <div className="orderHistory">
        {OrderHistory.length == 0 ? (
          <div className="noDataFound">No Order History Present</div>
        ) : (
          <>
            {OrderHistory?.map((e) => {
              return (
                <>
                  <Order
                    imgSrc={`${BASE_URL}${e.mealId["photoUrl"]}`}
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
      </div>

      <Modal
        isOpen={isMealModalOpen}
        onRequestClose={toggleMealModal}
        contentLabel="My dialog"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <h3>Select Meal - {selectedDay}</h3>
          <AiOutlineClose
            className="modal-close-icon"
            style={{ cursor: "pointer" }}
            role="button"
            onClick={toggleMealModal}
          />
        </div>

        <div className="modal-body">
          <div className="gray-container flex-wrap ">
            {meals.map((meal, key) => {
              return (
                <Card
                  key={key}
                  imgSrc={`${BASE_URL}${meal.mealId?.photoUrl}`}
                  mealName={meal.mealId?.name}
                  partnerName={meal.brandName}
                  coreItems={meal.mealId?.coreItems}
                  btnValue={JSON.stringify(meal)}
                  btnTitle="Select"
                  btnFn={(e) => {
                    const updatedWeekSchedule = [];
                    caregiverStore?.userRoleId?.weekSchedule?.map(
                      (schedule) => {
                        updatedWeekSchedule.push(
                          (
                            <>
                              {schedule.day === selectedDay
                                ? {
                                    day: selectedDay,
                                    mealId: JSON.parse(e).mealId,
                                  }
                                : schedule}
                            </>
                          ).props.children
                        );
                      }
                    );
                    // api call
                    const dataF = localStorage.getItem("caregiverStore");
                    // console.log(data);
                    const json = JSON.parse(dataF);

                    const data = {
                      _id: json?.userRoleId?._id,
                      weekSchedule: updatedWeekSchedule,
                    };

                    // console.log(data);

                    //call api to update service date
                    axios
                      .post(
                        `${BASE_URL}/api/auth/members/WeekSchedule`,

                        data
                      )
                      .then((res) => {
                        // console.log(res);
                        // alert(res.data.message);
                        window.location.href = "/caregiver-dashboard";
                        // setUpdatingService(false)
                      })
                      .catch((error) => {
                        console.log(error);
                        alert(
                          error?.response?.data?.error ||
                            "Something went wrong!"
                        );
                      });

                    setcaregiverStore({
                      ...caregiverStore,
                      weekSchedule: updatedWeekSchedule,
                    });
                    toggleMealModal();
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={toggleMealModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
