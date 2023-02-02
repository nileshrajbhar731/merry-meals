import React from "react";
import Nav from ".";


export default {
  title: "Common/Nav",
  component: Nav,
};

const Template = (args) => <Nav {...args} />;

export const NavLayout = Template.bind({});
NavLayout.args = {
  isLoggedIn:true
};

export const NavLa = Template.bind({});
NavLa.args = {
  isLoggedIn:false
};

// export const NavLayout = Template.bind({});
// NavLayout.args = {};
