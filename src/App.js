import "./App.css";
import Form from "./components/Form";

function App() {
  const struct = [
    {
      inputType: "text",
      key: "clientId",
      type: "number",
      label: "Client Id",
      required: true,
    },
    {
      inputType: "text",
      key: "name",
      type: "text",
      label: "Name",
    },
    {
      key: "xy",
      type: "object",
      label: "xy",
      items: [
        {
          inputType: "text",
          key: "model",
          type: "text",
          label: "Model",
        },
        {
          inputType: "text",
          key: "year",
          type: "text",
          label: "Year",
        },
      ],
    },
  ];

  return (
    <div className="container">
      <h1>Dynamic Form</h1>
      <Form struct={struct} />
    </div>
  );
}

export default App;
