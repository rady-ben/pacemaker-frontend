import { ELLIPS_LENGTH } from "../constant/ui";
import { isMobile } from "./ui";

export const ellipsisString = (text) => {
  return !isMobile() && text?.length && text?.length > ELLIPS_LENGTH
    ? `${text.substring(0, ELLIPS_LENGTH - 3)}...`
    : text;
};
