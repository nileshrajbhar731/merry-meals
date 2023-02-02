import React from "react";
import OrderCard from ".";

export default {
  title: "Common/OrderCard",
  component: OrderCard,
};

const Template = (args) => <OrderCard {...args} />;

export const MembersOrderCard = Template.bind({});
MembersOrderCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "image",
  mealName: "Veg Thali",
  partnerName: "xyz store",
  orderDate: "Ordered 18th Aug on 04:30pm",
  deliveryStatus: "Delivery",
  deliveryOrderDate: "Ordered 18th Aug on 04:30pm",
};

export const PartnerOrderCard = Template.bind({});
PartnerOrderCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "image",
  mealName: "Veg Thali",
  partnerName: "xyz store",
  orderDate: "Ordered 18th Aug on 04:30pm",
  deliveryStatus: "Delivery",
  deliveryOrderDate: "Ordered 18th Aug on 04:30pm",
};

export const RiderOrderCard = Template.bind({});
RiderOrderCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "image",
  mealName: "Veg Thali",
  partnerName: "xyz store",
  orderDate: "Ordered 18th Aug on 04:30pm",
  deliveryStatus: "Delivery",
  deliveryOrderDate: "Ordered 18th Aug on 04:30pm",
};

export const CaregiverOrderCard = Template.bind({});
CaregiverOrderCard.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg",
  imgAlt: "image",
  mealName: "Veg Thali",
  partnerName: "xyz store",
  orderDate: "Ordered 18th Aug on 04:30pm",
  deliveryStatus: "Delivery",
  deliveryOrderDate: "Ordered 18th Aug on 04:30pm",
};
