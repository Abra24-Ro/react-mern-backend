import moment from "moment";

moment;

const isDate = (value, res) => {
  if (!value) {
    return false;
  }
  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

export { isDate };
