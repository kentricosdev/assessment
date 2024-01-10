import formatPhone from "./formatPhone";

export default function phoneValidation(whatsappNumber: string | undefined) {
  const formattedPhone = formatPhone(whatsappNumber);

  return !!formattedPhone && formattedPhone.length >= 10;
};