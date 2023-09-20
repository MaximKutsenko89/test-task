import { Comments } from "./components/Comments/Comments";
import { Posts } from "./components/Posts/Posts";
import styles from "./css/app.module.css";

function App() {
   return (
      <div className={styles.app}>
         <aside className={styles.aside}>
            <h2 className={styles.asideTitle}>DAYRY APP</h2>
            <div className={styles.asideSubTitle}>Comment whit no sense</div>
         </aside>
         <div className={styles.mainContent}>
            <div className="container">
               <div className={styles.mainWrap}>
                  <Posts />
                  <Comments />
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
