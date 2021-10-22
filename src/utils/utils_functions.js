export const capitalizeStrings = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

export const grabNumbersFromTimestamp = (timestamp) => {
  return timestamp.match(/[0-9]+/);
};

export const timeConverter = (timestamp) => {
  const date = timestamp;
  return date;
};
