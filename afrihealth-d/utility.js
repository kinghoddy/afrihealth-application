import { formatDistance } from "date-fns";

const GOOGLE_PLACES_API_KEY = "AIzaSyCDO7ghQKlCUBOb-SzUjaSiQ17GRw9sVTs";

export const getCost = (duration) => {
  return duration / 2;
};

export const calculateEstimate = (distances) => {
  var distance = require("react-native-google-matrix");
  distance.apiKey = GOOGLE_PLACES_API_KEY;

  return new Promise((resolve, reject) => {
    distance.get({ ...distances }, function (err, data) {
      if (err) return reject(err);
      const price = Math.round(getCost(+data.durationValue) / 100) * 100;
      const distance = {
        text: data.distance,
        value: data.distanceValue,
      };
      const duration = {
        text: data.duration,
        value: data.durationValue,
      };
      resolve({ price, distance, duration });
    });
  });
};

export const currencyFormatter = (value, options) => {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "₦",
  };
  if (typeof value !== "number") value = 0.0;
  options = { ...defaultOptions, ...options };
  value = value.toFixed(options.significantDigits);

  const [currency, decimal] = value.split(".");
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};

export function objToArray(obj, reverse) {
  const arr = [];
  for (let key in obj) {
    arr.push({
      ...obj[key],
      key,
    });
  }
  return reverse ? arr.reverse() : arr;
}

export const date = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  let formattedDate = date.toLocaleString();
  formattedDate = formatDistance(date, now, {
    includeSeconds: true,
    addSuffix: true,
  });
  return formattedDate;
};
