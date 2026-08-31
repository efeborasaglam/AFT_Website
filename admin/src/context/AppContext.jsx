import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "CHF";
  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return "-";

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    if (!hasHadBirthdayThisYear) age -= 1;

    return age;
  };

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // slotDate kommt jetzt immer als "YYYY-MM-DD" aus dem Availability-Block
  const slotDateFormate = (slotDate) => {
    if (!slotDate) return "";
    const [year, month, day] = slotDate.split("-");
    return `${Number(day)} ${months[Number(month)]} ${year}`;
  };

  const value = {
    calculateAge,
    slotDateFormate,
    currency,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
