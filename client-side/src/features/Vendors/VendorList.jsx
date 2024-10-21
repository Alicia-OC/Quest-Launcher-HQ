import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import deleteVendorById from "./deleteVendor";
import { GetVendors } from "./_GetVendorsData";

const editButton = (e) => {
  let id = e.currentTarget.id;

  alert("Edit not available yet! Sorry :C");
};

const VendorList = ({}) => {
  let vendors = GetVendors();
  const vendorsMapped = vendors.map((vendor) => (
    <tr value={vendor._id} key={vendor._id} id={vendor._id}>
      <td>{vendor.fullName}</td>
      <td>{vendor.nickname}</td>
      <td>{!vendor.service.proofreading ? "TRA" : "TEP"}</td>
      <td>{vendor.language}</td>
      <td>{vendor.email}</td>
      <td>
        <button id={vendor._id} onClick={(e) => editButton(e)}>
          <FontAwesomeIcon icon={faEdit} />{" "}
        </button>
      </td>{" "}
      <td>
        <button
          id={vendor._id}
          onClick={(e) => deleteVendorById(e, vendor._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>{" "}
    </tr>
  ));

  if (vendors.length === 0) {
    return (
      <div>
        <p1>Loading...</p1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="AddVendorButton">
          <button className="AddVendorButton">
            {" "}
            <Link to="/NewVendor">Add a new vendor</Link>
          </button>
        </div>
        <table className="VendorsListDiv">
          <thead>
            <tr>
              <th scope="col">Full name</th>
              <th scope="col">Nickname</th>
              <th scope="col">Roles</th>
              <th scope="col">Target</th>
              <th scope="col">E-mail</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody> {vendorsMapped}</tbody>
        </table>
      </div>
    );
  }
};

export default VendorList;
