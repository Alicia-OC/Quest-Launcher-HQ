import GetRequest from "./fetchRequest.js";

function RequestList() {
  const request = GetRequest();

  let requestArr = [];
  if (request) {
    for (let i = 0; i < request.length; i++) {
      requestArr.push(
        <li id={request[i]._id} value={request[i].projectTitle}>
          <a href={"Request/" + request[i]._id}>
            {" "}
            {request[i].projectTitle}
          </a>
        </li>
      );
    }
  } else return <p1>Loading...</p1>;

  return (
    <div className="RequestListed">
      <button>Create new</button>
      <ul>{requestArr}</ul>
    </div>
  );
}

export default RequestList;
