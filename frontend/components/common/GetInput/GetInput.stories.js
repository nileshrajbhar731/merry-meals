import React from "react";
import GetInput from ".";

export default {
  title: "Common/GetInput",
  component: GetInput,
};

const Template = (args) => <GetInput {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
  label: "Name",
  htmlFor: "Name",
  type: "text",
  name: "name",
  id: "name",
  placeholder: "Enter youre Name",
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  label: "phone",
  htmlFor: "phone",
  type: "number",
  name: "phone",
  id: "phone",
  placeholder: "Enter your phone number",
};

export const DOBInput = Template.bind({});
DOBInput.args = {
  label: "DOB",
  htmlFor: "DOB",
  type: "date",
  name: "DOB",
  id: "DOB",
  placeholder: "Enter the your date of birth",
};

export const FileInput = Template.bind({});
FileInput.args = {
  label: "Varification Document",
  htmlFor: "VD",
  type: "file",
  accept: "image/png, image/jpeg",
  name: "vd",
  id: "vd",
  placeholder: "upload your document",
};

export const SelectInput = Template.bind({});
SelectInput.args = {
  name: "",
  id: "",
  option: ["1", "2", "3"],
  selected: "nilesh",
  selectPoint: true,
  optgroup: true,
  optgroupLable: "nilesh2",
};
