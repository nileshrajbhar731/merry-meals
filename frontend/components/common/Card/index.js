import styles from "./card.module.scss";

export default function Card({
  imgSrc,
  imgAlt,
  mealName,
  partnerName,
  coreItems,
  btnTitle = "Select",
  btnValue,
  btnClass,
  btnFn,
  isFrozenMeal,
  isDisabled = false,
  hideBtn = false,
  showMealType,
}) {
  return (
    <>
    {console.log(isFrozenMeal)}
      {/* <div className={`${styles.container}`}> */}
      <div className={`${styles.card}`}>
        <div className={`${styles.imgContainer}`}>
          <img src={imgSrc} alt={imgAlt} />
        </div>

        <div className={`${styles.main}`}>
          <div className={`${styles.cardHeader}`}>
            <div>
              <h3>{mealName}</h3>
              <p>{partnerName}</p>
            </div>
            {showMealType && (
              <>
                {
                  (!isFrozenMeal ? (
                    <>
                      <img
                        className={`${styles.mealTypeImg}`}
                        src="/icons/Vector.png"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        className={`${styles.mealTypeImg}`}
                        src="/icons/frozen.png"
                      />
                    </>
                  ))
                }
              </>
            )}
          </div>

          <div className={`${styles.list}`}>
            {coreItems?.map((e) => {
              return (
                <>
                  <p>{e}</p>
                </>
              );
            })}
          </div>

          {!hideBtn && (
            <button
              type="button"
              value={btnValue}
              onClick={(e) => btnFn(e.target.value)}
              disabled={!!isDisabled}
              className={`${styles.btn} btn btn_success ${
                btnClass && btnClass
              }`}
            >
              {btnTitle}
            </button>
          )}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
