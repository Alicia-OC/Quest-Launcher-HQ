import { useNavigate } from "react-router-dom";
import cat from "../img/photo_2024-10-18_13-38-02.jpg";

const Public = () => {
  let navigate = useNavigate();
  const routeLogin = () => {
    navigate("login");
  };
  const routeNewAccount = () => {
    navigate("register");
  };

  const content = (
    <>
      <section className="public">
        <main className="public_main">
          <div>
            <h1>Welcome!</h1>
            <button onClick={routeLogin}> Log to start</button>
            <button onClick={routeNewAccount}> Create an account</button>
          </div>
        </main>
      </section>
      <section className="public">
        {" "}
        <img className="templateScreenshot" src={cat}></img>
      </section>
    </>
  );
  return content;
};
export default Public;
