// frontend\components\Layout\index.js

import Header from "./Header";
import styles from "./layout.module.scss";

export default function Layout({ children }) {
  return (
    <div className={`${styles.appContainer}`}>
      <Header />

      <main>{children}</main>

      <footer>Copyright © 2014 Merry Meals. All Rights Reserved.</footer>
    </div>
  );
}
