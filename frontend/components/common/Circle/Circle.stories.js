import React from "react";
import Circle from ".";

export default {
  title: "Common/Circle",
  component: Circle,
};

const Template = (args) => <Circle {...args} />;

export const RiderCircle = Template.bind({});
RiderCircle.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "RiderCard",
  riderName: "RiderName",
};
