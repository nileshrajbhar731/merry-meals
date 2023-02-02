import React from "react";
import Layout from ".";

export default {
  title: "Layout",
  component: Layout,
};

const Template = (args) => <Layout {...args} />;

export const EmptyLayout = Template.bind({});
EmptyLayout.args = {};
