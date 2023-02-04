import styles from "./profileCard.module.css";

export default function ProfileCard({
  imgSrc,
  imgAlt,
  memberName,
  VerificationStatus,
  subscriptionStatus = "",
  btnValue,
}) {
  return (
    <>
      {/* <div className={`${styles.row}`}> */}
        <div className={`${styles.container}`}>
          <div className={`${styles.img}`}>
            <img src={imgSrc} alt={imgAlt} />
          </div>
          <div className={`${styles.userName}`}>
            <div className={`${styles.userNameMain}`}>
              <strong>{memberName}</strong>
              <p>
                {subscriptionStatus ? subscriptionStatus : VerificationStatus}
              </p>
            </div>
          </div>
          <div className={`${styles.btnClass}`}>
            <div className={`${styles.btnMain}`}>
              <button className={`${styles.btn}`}>{btnValue}</button>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
