import { isMobile } from "./ui";

export const ellipsisString = (text) => {
  return !isMobile() && text?.length && text?.length > 18
    ? `${text.substring(0, 14)}...`
    : text;
};
