import { useState } from "react";
import AddFields from "./AddFields";
import AddGroup from "./AddGroup";

function Form({ struct }) {
  const [form, setForm] = useState(struct);
  const [values, setValues] = useState(transformToValues(struct));

  function transformToValues(object) {
    return object.reduce((acc, field) => {
      if (field.type === "object")
        return { ...acc, [field.key]: transformToValues(field.items) };
      return { ...acc, [field.key]: "" };
    }, {});
  }

  console.log(form);

  return (
    <div>
      <form action="">
        {JSON.stringify(values)}
        <div className="p-3">
          {form.map((field, index) => {
            if (field.type === "object") {
              return (
                <FieldGroup
                  onFieldAdd={(newItems) => {
                    setForm(
                      form.map((item, i) => {
                        if (i === index) {
                          return {
                            ...item,
                            items: [...item.items, ...newItems],
                          };
                        }
                        return item;
                      })
                    );
                    setValues({
                      ...values,
                      [field.key]: {
                        ...values[field.key],
                        ...transformToValues(newItems),
                      },
                    });
                  }}
                  group={field}
                  values={values[field.key]}
                  onChange={(e, key) => {
                    setValues((prev) => {
                      return {
                        ...prev,
                        [field.key]: {
                          ...prev[field.key],
                          [key]: e.target.value,
                        },
                      };
                    });
                  }}
                />
              );
            }
            return (
              <Field
                key={field.key}
                field={field}
                value={form[field.key]}
                onChange={(e) => {
                  setValues((prev) => {
                    return { ...prev, [field.key]: e.target.value };
                  });
                }}
              />
            );
          })}
        </div>
        <div>
          <AddGroup
            onAdd={(group) => {
              setForm([...form, group]);
              setValues({ ...values, ...transformToValues([group]) });
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Form;

function FieldGroup({ group, values, onChange, onFieldAdd, onGroupAdd }) {
  const fields = group.items;

  return (
    <fieldset className="d-flex flex-column border p-3 mt-3 gap-2">
      <legend>{group.label}</legend>
      {fields.map((field) => {
        return (
          <Field
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(e) => {
              onChange(e, field.key);
            }}
          />
        );
      })}
      <AddFields onAdd={onFieldAdd} />
    </fieldset>
  );
}

function Field({ field, onChange, value }) {
  return (
    <label key={field.key} className="d-flex flex-column gap-2">
      {field.label}
      <input
        className="form-control w-50"
        type={field.inputType || "text"}
        onChange={onChange}
        value={value}
      />
    </label>
  );
}
