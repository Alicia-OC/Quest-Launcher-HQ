import { mongoDB_Vendors } from "../../apis";

const deleteVendorById = async (e, props) => {
  let vendorID = JSON.stringify({ id: props });
  console.log(vendorID);

  if (window.confirm("Are you sure?")) {
    fetch(mongoDB_Vendors, {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: vendorID,
    })
      .then((response) => {
        console.log(response);
        alert("vendor deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
};

export default deleteVendorById;
