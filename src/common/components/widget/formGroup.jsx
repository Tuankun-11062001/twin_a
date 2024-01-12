import React, { useState } from "react";
import Input from "./input";
import Button from "./button";
import Svgs from "../../localData/svgs";
import Select from "./select";

const FormGroup = ({ type = "normal", data }) => {
  switch (type) {
    case "normal":
      return <FormGroupNormal data={data} />;
    case "select":
      return <FormGroupSelect data={data} />;
    case "area":
      return <FormGroupArea data={data} />;
    case "add":
      return <FormGroupAdd data={data} />;
    default:
      return <FormGroupNormal data={data} />;
  }
};

const FormGroupNormal = ({ data }) => {
  return (
    <div className={data.classnameFormGroup}>
      <p>{data.lable}</p>
      <Input
        placeholder={data.inputPlaceholder || "your placeholder"}
        classname={data.inputClassname}
        type={data.inputType || "text"}
        name={data.inputName || "name"}
        value={data.inputValue}
        onListen={data.inputListen}
      />
    </div>
  );
};

const FormGroupAdd = ({ data }) => {
  console.log("data image", data.image);
  return (
    <div className={data.classnameFormGroup}>
      <div>
        <p>{data.lable}</p>
        <Button
          svg={<Svgs type="add" />}
          classname={data.classnameButton}
          onListen={data.buttonListen}
        />
      </div>
      <div className={data.classnameListInput}>
        {data.dataListImage?.map((img, indx) => (
          <div key={indx}>
            <span
              className={data.classnameDisplayColor}
              style={{ background: img.color }}
            ></span>
            <Input
              placeholder={data.inputplaceholder || "your placeholder"}
              classname={data.inputClassname}
              type={data.inputType || "text"}
              name="text"
              value={img.color}
              disabled={true}
            />
            <Input
              placeholder={data.inputplaceholder || "your placeholder"}
              classname={data.inputClassname}
              type={data.inputType || "text"}
              name="linkColor"
              value={img.colorLink}
              disabled={true}
            />
            <Button
              title="Delete"
              onListen={() => data.onListenRemoveColor(indx)}
              classname="button button_remove_color"
            />
          </div>
        ))}
      </div>

      {data.addOneColor && <AddOneInputColor data={data} />}
    </div>
  );
};

const FormGroupSelect = ({ data }) => {
  return (
    <div className={data.classnameFormGroup}>
      <p>{data.lable}</p>
      <Select
        data={data.dataSelect}
        classname={data.classnameSelect}
        placeholder={data.inputplaceholder || "your placeholder"}
        name={data.inputName || "name"}
        value={data.inputValue}
        onListen={data.inputListen}
      />
    </div>
  );
};

const FormGroupArea = ({ data }) => {
  return (
    <div className={data.classnameFormGroup}>
      <p>{data.lable}</p>
      <textarea
        className={data.classnameArea}
        placeholder={data.inputplaceholder || "your placeholder"}
        type={data.inputType || "text"}
        name={data.inputName || "name"}
        value={data.inputValue}
        onChange={data.inputListen}
      ></textarea>
    </div>
  );
};

const AddOneInputColor = ({ data }) => {
  const [colors, setColors] = useState({
    color: "",
    colorLink: "",
  });

  const onlistenChange = (e) => {
    const { name, value } = e.target;
    setColors((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="form_group form_group_add_color">
      <span></span>
      <div>
        <Input
          placeholder="New color"
          classname={data.inputClassname}
          name="color"
          type="color"
          value={colors.color}
          onListen={onlistenChange}
        />
        <Input
          placeholder="new color link"
          classname={data.inputClassname}
          name="colorLink"
          value={colors.colorLink}
          onListen={onlistenChange}
        />
      </div>
      <div>
        <Button
          title="Accept"
          classname="button button_accept"
          onListen={() => data.addOneColorListen(colors)}
        />
        <Button
          title="Decline"
          classname="button button_decline"
          onListen={data.onListenIsAddOneColor}
        />
      </div>
    </div>
  );
};

export default FormGroup;
