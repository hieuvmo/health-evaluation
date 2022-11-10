import BackgroundImage from "./assets/background.jpg";
import style from "./App.module.css";
import TextField from "./components/TextField";

function App() {
  return (
    <div
      className={style.container}
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className={style.form}>
        <h1>Chào mừng bạn đến với hệ thống</h1>

        <TextField label="Chiều cao" placeholder="Nhập chiều cao của bạn" />
      </div>
    </div>
  );
}

export default App;
