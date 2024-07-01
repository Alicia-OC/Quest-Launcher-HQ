import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import deleteVendorById from "./deleteVendor";
import { GetVendors } from "./_GetVendorsData";

const editButton = (e) => {
  let id = e.currentTarget.id;
  alert("Edit not available yet! Sorry :C");
};

const VendorPerLangList = (props) => {
  const {language} = useParams()
  const {languageId} = useParams()
  let languageToRender = 'FR'

  let vendors = GetVendors();

  const filteredVendor = vendors.filter(
    (vendor) => vendor.language == languageToRender
  );

  const vendorsMapped = filteredVendor.map((vendor) => (
    <tr value={vendor._id} key={vendor._id} id={vendor._id}>
      <td>{vendor.fullName}</td>
      <td>{vendor.nickname}</td>
      <td>{!vendor.service.proofreading ? "TRA" : "TEP"}</td>
      <td>{vendor.language}</td>
      <td>{vendor.email}</td>
      <td>
        <button className="VendorsListEditButton" id={vendor._id} onClick={(e) => editButton(e)}>
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

  console.log(filteredVendor);

  if (!filteredVendor) {
    return (
      <div>
        <p1>
          Sorry! Our database is currently on strike and they will only show you
          our top vendor:
        </p1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="addNewVendorButton">
          <Link to="/NewVendor">Add a new vendor</Link>
        </div>
        <table>
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

export default VendorPerLangList;
