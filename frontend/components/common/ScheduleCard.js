import React from "react";
import { FiEdit2 } from "react-icons/fi";

const ScheduleCard = ({
  btnTitle,
  updateMeal,
  orderNow,
  weekDay,
  mealTitle,
  partner,
  selectMeal,
}) => {
  return (
    <div className="scheduleCard_container">
      <p className="weekDay">{weekDay}</p>
      <div
        className={`schedule_card ${weekDay === "Sun" && "frozen_card"} ${
          weekDay === "Sat" && "frozen_card"
        }`}
      >
        <div>
          {updateMeal && <FiEdit2 className="edit_btn" onClick={updateMeal} />}

          {mealTitle !== "" && partner !== "" ? (
            <>
              <h3 className="mealTitle">{mealTitle}</h3>
              <p>From: {partner}</p>
            </>
          ) : (
            <p className="text-danger">No Meal Selected</p>
          )}

          <a onClick={selectMeal}>{btnTitle}</a>
        </div>

        <div className="orderNow">{orderNow}</div>
        {/* {orderNow} ? (
          <>
           
          </>
        ) : (
          <>
            {/* {selectMeal && (
              <button
                type="button"
                className="btn btn_success"
                onClick={selectMeal}
              >
                {btnTitle}
              </button>
            )} *
          </>
        )} */}
      </div>
    </div>
  );
};

export default ScheduleCard;
