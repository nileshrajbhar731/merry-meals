import React from "react";
import Card from ".";

export default {
  title: "Common/Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const JaneCard = Template.bind({});
JaneCard.args = {
  name: "Jane Doe",
};

export const LoggedOut = Template.bind({});
LoggedOut.args = { name: "User One" };
