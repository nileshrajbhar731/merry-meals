export const getBase64 = (file) => {
  if (!file) return "";
  console.log(file);

  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject();
      console.log("Error: ", error);
    };
  });
};

export const phNoValidationProps = {
  min: 1000000000,
  max: 9999999999,
};
export const dobValdationProps = {
  max: new Date(new Date().setFullYear(new Date().getFullYear() - 5))
    .toISOString()
    .split("T")[0],
};

export const BASE_URL = process.env.NEXT_PUBLIC_NODE_URL;
export const APIKEY = process.env.NEXT_PUBLIC_APIKEY;
export const acceptedDocs = [".pdf"];
export const acceptedProfilePic = [".jpeg", ".png", ".jpg", ".svg"];

export const ORDER_STATUS = [
  "requested",
  "accepted",
  "prepared",
  "picked",
  "completed",
];
export function getUserType() {
  const isMember = !!JSON.parse(
    localStorage.getItem("memberStore") || JSON.stringify(""),
  )?._id;
  if (isMember) return "Member";

  const isCaregiver = !!JSON.parse(
    localStorage.getItem("caregiverStore") || JSON.stringify(""),
  )?._id;
  if (isCaregiver) return "Caregiver";

  const isPartner = !!JSON.parse(
    localStorage.getItem("partnerStore") || JSON.stringify(""),
  )?._id;
  if (isPartner) return "Partner";

  const isRider = !!JSON.parse(
    localStorage.getItem("riderStore") || JSON.stringify(""),
  )?._id;
  if (isRider) return "Rider";

  const isAdmin = !!JSON.parse(
    localStorage.getItem("adminStore") || JSON.stringify(""),
  )?._id;
  if (isAdmin) return "Admin";

  return "";
}
