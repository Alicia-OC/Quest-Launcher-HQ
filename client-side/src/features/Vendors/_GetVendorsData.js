
import { useState, useEffect } from "react";
import { mongoDB_Vendors } from "../../apis";
import Axios from "axios";

const GetVendors = () => {
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    Axios.get(mongoDB_Vendors)
      .then((res) => setVendors(res.data))
      .catch((err) => console.log(err));
  }, []);
  return vendors;
};

const GetProofreaders = () => {
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    Axios.get(mongoDB_Vendors)
      .then((res) => setVendors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProof = vendors.filter(
    (vendor) => vendor.service.proofreading == true
  );

  return filteredProof;
};

const GetTranslators = () => {
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    Axios.get(mongoDB_Vendors)
      .then((res) => setVendors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredTrans = vendors.filter(
    (vendor) => vendor.service.translation == true
  );

  return filteredTrans;
};

export { GetVendors, GetProofreaders, GetTranslators };
