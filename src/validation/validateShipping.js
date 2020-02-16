import _ from "lodash";

const validateShipping = data => {
  let errors = {};

  data.name = _.get(data, "name", "");
  data.address = _.get(data, "address", "");
  data.city = _.get(data, "city", "");
  data.postcode = _.get(data, "postcode", "");
  data.phoneNumber = _.get(data, "phoneNumber", "");

  if (_.isEmpty(data.name)) {
    errors.name = "Please enter your name";
  }
  if (_.isEmpty(data.address)) {
    errors.address = "Please enter your address";
  }
  if (_.isEmpty(data.city)) {
    errors.city = "Please enter your city";
  }
  if (_.isEmpty(data.country)) {
    errors.country = "Please enter your country";
  }
  if (_.isEmpty(data.phonenumber)) {
    errors.phonenumber = "Please enter your phone number";
  }
  if (!/[0-9]/.test(data.phonenumber)) {
    errors.phonenumber = "Please enter valid phone number";
  }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

export default validateShipping;
