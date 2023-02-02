import styles from "./bigInfoCard.module.scss";
import {AiOutlineRight} from 'react-icons/ai'

export default function BigInfoCard({
  imgSrc,
  imgAlt,
  partnerName,
  address,
  verificationStatus
}) {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.card}`}>
          <img src={imgSrc} alt={imgAlt} />
        </div>

        <div className={`${styles.cardcenter}`}>
          <h3>{partnerName}</h3>
          <p>Address:{address}</p>
          <p className={`${styles.verificationStatus}`}>
            {verificationStatus && `Verification ${verificationStatus}`}
          </p>
        </div>

        <div className={`${styles.btnMain}`}>
          {/* <img src="/icons/chevron-right-solid.svg" alt="" /> */}
          <AiOutlineRight/>
        </div>
      </div>
    </>
  );
}
