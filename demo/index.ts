//sample

import { PopUp } from "../src/index";
// import { DropDownList } from "../src/DropDownList/Base/dropdownlist";
// import { DropDownList } from "../dist/bundle"; // after build
// import { ComponentBase } from "../../../node_modules/edc_base_ts/src/Base/component";

let dataSource: string[] = ['vasanth', 'gokul', 'kumar', 'pappitha'];

let sampleDD: PopUp = new PopUp({
  width: "200px",
  height: "300px",
  position: {x: 100, y: 100}
});
sampleDD.appendTo('dd');