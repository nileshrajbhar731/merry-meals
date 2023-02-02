import React from "react";
import BigInfoCard from ".";

export default {
  title: "Common/BigInfoCard",
  component: BigInfoCard,
};

const Template = (args) => <BigInfoCard {...args} />;

export const AdminPartnerBigInfoCard = Template.bind({});
AdminPartnerBigInfoCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "image",
  partnerName: "XYZ Foundation",
  address:
    "consectetur adipiscing elit, sed do eiusmod tempor, laboreet dolore, Mumbai",
  verificationStatus: "Pending",
};

export const RiderPartnerBigInfoCard = Template.bind({});
RiderPartnerBigInfoCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "image",
  partnerName: "XYZ Foundation",
  address:
    "consectetur adipiscing elit, sed do eiusmod tempor, laboreet dolore, Mumbai",
};

export const RiderRegistrationBigInfoCard = Template.bind({});
RiderRegistrationBigInfoCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "image",
  partnerName: "XYZ Foundation",
  address:
    "consectetur adipiscing elit, sed do eiusmod tempor, laboreet dolore, Mumbai",
};
