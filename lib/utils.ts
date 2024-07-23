import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - createdAt.getTime();
  const diffInSec = Math.floor(diffInMs / 1000);

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diffInSec < minute) {
    return `${diffInSec} segundos atrás`;
  } else if (diffInSec < hour) {
    const diffInMin = Math.floor(diffInSec / minute);
    return `${diffInMin} minutos atrás`;
  } else if (diffInSec < day) {
    const diffInHrs = Math.floor(diffInSec / hour);
    return `${diffInHrs} horas atrás`;
  } else if (diffInSec < month) {
    const diffInDays = Math.floor(diffInSec / day);
    return `${diffInDays} dias atrás`;
  } else if (diffInSec < year) {
    const diffInMonths = Math.floor(diffInSec / month);
    return `${diffInMonths} meses atrás`;
  } else {
    const diffInYears = Math.floor(diffInSec / year);
    return `${diffInYears} anos atrás`;
  }
};

export const humanReadableNumber = (num: number): string => {
  const units = ["", "K", "M", "B", "T"];
  let number = num;

  // Determine the order of magnitude
  let order = 0;
  while (number >= 1000 && order < units.length - 1) {
    number = number / 1000;
    order++;
  }

  // Format the number to 2 decimal places if order
  const formattedNumber = order > 0 ? number.toFixed(2) : number;

  return `${formattedNumber}${units[order]}`;
};

export const getMonthYear = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" }); // Get full month name
  const year = date.getFullYear(); // Get full year
  return capitalizeFirstLetter(`${month} ${year}`);
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
