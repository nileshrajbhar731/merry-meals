import styles from "./loader.module.css";

export default function Loader({submit}) {
  return (
    <>
      <div className={styles.loader}>
       <img src="/images/1480.gif" className={styles.img_loader}/>
       {
        submit=="submit" && <h1>Submitting...</h1>
       }
       {
        submit=="load" && <h1>Loading...</h1> 

       }
       {
        submit=="login" && <h1>login...</h1> 

       }
      </div>
    </>
  );
}
