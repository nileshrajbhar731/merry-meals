import React from "react";
import InfoBox from ".";

export default {
  title: "Common/InfoBox",
  component: InfoBox,
};

const Template = (args) => <InfoBox {...args} />;

export const AdminInfoBoxDonations = Template.bind({});
AdminInfoBoxDonations.args = {
  titleName: "Total Donations",
  totalPayment: "50.01k",
  updateStatus: "updated 1 min ago",
  paymentDetails: "+2.1k",
};

export const AdminInfoBoxFunds = Template.bind({});
AdminInfoBoxFunds.args = {
  titleName: "Available Funds",
  totalPayment: "30.58k",
  updateStatus: "updated 1 min ago",
  paymentDetails: "-1.2k",
};

export const AdminInfoBoxDonors = Template.bind({});
AdminInfoBoxDonors.args = {
  titleName: "Total Donors",
  totalPayment: "20",
  updateStatus: "updated 1 min ago",
  paymentDetails: "+5",
};
