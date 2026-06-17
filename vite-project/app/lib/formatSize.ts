/**
 * Converts bytes to human-readable format (KB, MB, CB)
 * @param bytes - The number of bytes to convert
 * @returns A human-readable string representation
 */
export const formatSize = (bytes: number): string => {
  if (bytes < 0) return "0 Bytes";
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "CB"]; // Using CB as requested by the user
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const index = Math.min(Math.max(i, 0), sizes.length - 1);

  const value = bytes / Math.pow(k, index);
  // Format to 2 decimal places and remove trailing zeros if they are not needed
  const formattedValue = Number(value.toFixed(2));
  return `${formattedValue} ${sizes[index]}`;
};

export const formatsize = formatSize;
