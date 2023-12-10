import React, { useState } from "react";
import GetTemplate from "../../../../features/templates/GetTemplate";

function SideMenu() {
  const templates = GetTemplate();

  let templateTitlesArrtest;

  if (templates) {
    templateTitlesArrtest = templates.map((element) => (
      <li id={element._id}>
        <a className="" href={"/Template/" + element._id}>
          {element.templateTitle.slice(0, 12)}...
        </a>
      </li>
    ));
  }

  return (
    <div>
      <p>This is a test</p>

      <ul> {templateTitlesArrtest}</ul>
    </div>
  );
}

export default SideMenu;
