import React from "react";
import Card from ".";

export default {
  title: "Common/Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const MembersCard = Template.bind({});
MembersCard.args = {
  imgSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "image",
  mealName: "Veg",
  partnerName: "xyz store",
  mealKm:"10km",
  coreItem: ["samosa", "samosa", "samosa", "samosa"],
  btnValue: "Select Meal",
};

export const PartnerCard = Template.bind({});
PartnerCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "PartnerCard",
  mealName: "samosa",
  // mealtype:[],
  partnerName: "Nilesh",
  mealKm:"10km",
  btnValue: "Accept Request",

};

export const RiderCard = Template.bind({});
RiderCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "RiderCard",
  mealName: "samosa",
  // mealtype:[],
  partnerName: "Nilesh",
  mealKm:"10km",
  btnValue: "Accept Request",
};
