import { CommonFunction as FWCommonFunction } from "../../../framework/functions/commonFunction";
/**
 * Common function
 */
export class CommonFunction extends FWCommonFunction {}

// convertToRoman.ts
export const convertToRoman = (num: number): string => {
  const value: number[] = [
    1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
  ];
  const symbol: string[] = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  let roman = "";
  for (let i = 0; i < value.length; i++) {
    while (num >= value[i]) {
      num -= value[i];
      roman += symbol[i];
    }
  }
  return roman;
};

export const convertFileSize = (sizeInBytes: number): string => {
  const BYTE = 1;
  const KILOBYTE = 1024 * BYTE;
  const MEGABYTE = 1024 * KILOBYTE;
  const GIGABYTE = 1024 * MEGABYTE;
  const TERABYTE = 1024 * GIGABYTE;
  if (sizeInBytes < KILOBYTE) {
    return sizeInBytes + " Bytes";
  } else if (sizeInBytes < MEGABYTE) {
    return (sizeInBytes / KILOBYTE).toFixed(2) + " KB";
  } else if (sizeInBytes < GIGABYTE) {
    return (sizeInBytes / MEGABYTE).toFixed(2) + " MB";
  } else if (sizeInBytes < TERABYTE) {
    return (sizeInBytes / GIGABYTE).toFixed(2) + " GB";
  } else {
    return (sizeInBytes / TERABYTE).toFixed(2) + " TB";
  }
};

/**
 * Formats milliseconds into a more readable format.
 * @param milliseconds The number of milliseconds to format.
 * @returns A string representing the formatted time.
 */
export const formatMilliseconds = (milliseconds: number): string => {
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (milliseconds < 1000) {
    return milliseconds + " ms";
  } else if (seconds < 60) {
    return seconds.toFixed(2) + " seconds";
  } else if (minutes < 60) {
    return minutes.toFixed(2) + " minutes";
  } else if (hours < 24) {
    return hours.toFixed(2) + " hours";
  } else {
    return days.toFixed(2) + " days";
  }
};

/**
 * Calculates the remaining time for the upload to complete based on the current upload speed and progress.
 * @param speed - The current upload speed in kilobytes per second (KB/s).
 * @param uploadedKB - The total amount of data uploaded in kilobytes (KB).
 * @param totalKB - The total size of the file being uploaded in kilobytes (KB).
 * @returns The remaining time in milliseconds (ms) until the upload completes.
 */
export const calculateRemainingTime = (
  speed: number,
  uploadedKB: number,
  totalKB: number
): number => {
  // Calculate remaining KB to upload
  const remainingKB = totalKB - uploadedKB;

  // Ensure speed is greater than zero to avoid division by zero
  if (speed <= 0) {
    return Infinity; // Return infinity for unknown or stalled speed
  }

  // Calculate remaining time in milliseconds
  return Math.ceil((remainingKB / speed) * 1000);
};
