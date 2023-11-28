import { useState } from "react";


const PickServiceButtons = (props) => {
  const [serviceClicked, setServiceClicked] = useState();

  const ServiceButtonClicked = (e) => {
    let valueClicked = e.target.value;
    setServiceClicked(valueClicked);
    props.getService(e.target.value);
  };
  const buttonsContent = //updates serviceHeads & serviceClicked
    (
      <div className="buttonsToPickService">
        <button
          value="TEP"
          type="button"
          onClick={(e) => {
            ServiceButtonClicked(e);
          }}
        >
          Translation+Proofreading
        </button>
        <button
          value="TRA"
          type="button"
          onClick={(e) => {
            ServiceButtonClicked(e);
          }}
        >
          Translation
        </button>
        <button
          value="PRF"
          type="button"
          onClick={(e) => {
            ServiceButtonClicked(e);
          }}
        >
          Proofreading
        </button>
      </div>
    );

  return buttonsContent;
};


export default PickServiceButtons