import { Link, useNavigate } from "react-router-dom";

const Public = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("login");
  };

  const content = (
    <section className="public">
      <main className="public__main">
        <div>
          <h1>Welcome!</h1>
          <button onClick={routeChange}> Log to start!</button>
        </div>
      </main>
    </section>
  );
  return content;
};
export default Public;
