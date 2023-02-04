import style from "./main-content.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function MainContent({ components }) {
  return (
    <main className={style.main_container}>
      <div className={style.content}>
        <div className={style.block}></div>
        <BurgerConstructor components={components}/>
      </div>
    </main>
  );
}

export default MainContent;
