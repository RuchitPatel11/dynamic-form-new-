import { useState } from "react";

function AddFields({ shouldBeOpen = false, onAdd }) {
  const [keys, setKeys] = useState("");
  return (
    <div className="d-flex gap-3 mt-3">
      <label>
        <input
          type="text"
          placeholder="Field1, Field2"
          value={keys}
          onChange={(e) => setKeys(e.target.value)}
        />
      </label>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setKeys("");
          onAdd(
            keys.split(",").map((key) => {
              return {
                inputType: "text",
                key,
                type: "text",
                label: key,
                required: true,
              };
            })
          );
        }}
      >
        Add Property
      </button>
    </div>
  );
}

export default AddFields;
