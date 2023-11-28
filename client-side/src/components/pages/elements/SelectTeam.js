import { React, useState } from "react";

import { GetTranslators } from "../../../features/Vendors/_GetVendorsData";
import { GetProofreaders } from "../../../features/Vendors/_GetVendorsData";

export const SelectTeam = ({ service, languages, onChange }) => {
  const translators = GetTranslators();
  const proofreaders = GetProofreaders();
  const [fullTable, setFullTable] = useState("");

  return <tbody id="tableBody">{fullTable}</tbody>;
  //return fullTable;
};
