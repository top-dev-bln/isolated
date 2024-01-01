import { useState } from "react";
import PropTypes from "prop-types";

function FormCreate({ onFormSubmit, onInputChange }) {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onFormSubmit) {
      onFormSubmit({
        input1,
        input2,
        input3,
      });
    }
  };

  const handleInputChangeLocal = (name, value) => {
    // Update local state
    if (name === "input1") setInput1(value);
    else if (name === "input2") setInput2(value);
    else if (name === "input3") setInput3(value);

    // Call the onInputChange callback provided by the parent
    if (onInputChange) {
      onInputChange(name, value);
    }
  };
  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          value={input1}
          onChange={(e) => {
            setInput1(e.target.value);
            handleInputChangeLocal("input1", e.target.value);
          }}
          placeholder="Input 1"
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          value={input2}
          onChange={(e) => {
            setInput2(e.target.value);
            handleInputChangeLocal("input2", e.target.value);
          }}
          placeholder="Input 2"
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          value={input3}
          onChange={(e) => {
            setInput3(e.target.value);
            handleInputChangeLocal("input3", e.target.value);
          }}
          placeholder="Input 3"
          style={{ marginBottom: "10px" }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

FormCreate.propTypes = {
  onFormSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default FormCreate;
