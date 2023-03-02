import { useState } from "react";
import AddFields from "./AddFields";

function AddGroup({ onAdd }) {
  const [showForm, setShowForm] = useState(false);
  const [groupName, setGroupName] = useState("");

  return (
    <div className="mb-5">
      {showForm ? (
        <div>
          <label>
            Group Name
            <input
              type="text"
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
            />
          </label>
          <AddFields
            onAdd={(items) => {
              onAdd({
                type: "object",
                key: groupName,
                items,
                label: groupName,
              });
              setGroupName("");
              setShowForm(false);
            }}
          />
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="btn btn-dark">
          Add new group
        </button>
      )}
    </div>
  );
}

export default AddGroup;
