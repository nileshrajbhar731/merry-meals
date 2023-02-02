import React from "react";
import ProfileCard from ".";

export default {
  title: "Common/ProfileCard",
  component: ProfileCard,
};

const Template = (args) => <ProfileCard {...args} />;

export const CaregiverProfileCard = Template.bind({});
CaregiverProfileCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "CaregiverProfileCard",
  memberName: "Member 1",
  subscriptionStatus: "Renew plan in 2 weeks",
  btnValue: "View Plan",
};

export const AdminMemberProfileCard = Template.bind({});
AdminMemberProfileCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "AdminPartnerProfileCard",
  memberName: "Member 1",
  VerificationStatus: "Varification Panding",
  btnValue: "View Delais",
};

export const AdminRiderProfileCard = Template.bind({});
AdminRiderProfileCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "AdminRiderProfileCard",
  memberName: "RiderName 1",
  VerificationStatus: "Varification Panding",
  btnValue: "View Delais",
};
