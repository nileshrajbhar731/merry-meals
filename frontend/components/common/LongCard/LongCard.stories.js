import React from "react";
import LongCard from ".";

export default {
  title: "Common/LongCard",
  component: LongCard,
};

const Template = (args) => <LongCard {...args} />;

export const PartnerLongCard = Template.bind({});
PartnerLongCard.args = {
  imgSrc: "https://www.w3schools.com/howto/img_avatar2.png",
  imgAlt: "PartnerLongCard",
  mealName: "Veg Thali",
  partnerName: "Nilesh Bhardwaj, Mumbai",
  order: "Ordered 18th Aug on 04:30pm",
  btnValue: "Out Of Delivery",
  updateStatus: "Update Status",
};

export const RiderLongCard = Template.bind({});
RiderLongCard.args = {
  imgSrc: "https://www.w3schools.com/howto/img_avatar2.png",
  imgAlt: "RiderLongCard",
  mealName: "Veg Thali",
  partnerName: "Nilesh Bhardwaj, Mumbai",
  address: "33 Datattary Chal no 7b indira ngr ghatkopar west mumabi-86",
  order: "Accepted 18th Aug on 04:30pm",
  btnValue: "Delivery",
  updateStatus: "Update Status",
};
