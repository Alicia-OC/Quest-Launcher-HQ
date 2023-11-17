import { Link, useNavigate } from "react-router-dom";

const Public = () => {
  let navigate = useNavigate();
  const routeLogin = () => {
    navigate("login");
  };
  const routeNewAccount = () => {
    navigate("register");
  };

  const content = (
    <section className="public">
      <main className="public__main">
        <div>
          <h1>Welcome!</h1>
          <button onClick={routeLogin}> Log to start!</button>
          <button onClick={routeNewAccount}> Create an account</button>

        </div>
      </main>
    </section>
  );
  return content;
};
export default Public;
