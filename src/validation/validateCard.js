import _ from "lodash";

const validateCard = data => {
  let errors = {};

  data.cardNumber = _.get(data, "cardNumber", "");
  data.cardName = _.get(data, "cardName", "");
  data.cardMonth = _.get(data, "cardMonth", "");
  data.cardYear = _.get(data, "cardYear", "");
  data.cardCvv = _.get(data, "cardCvv", "");
  data.cardNumberMaxLength = _.get(data, "cardNumberMaxLength", "");

  if (_.isEmpty(data.cardNumber)) {
    errors.cardNumber = "Please enter your card number";
  }

  if (data.cardNumber.length < data.cardNumberMaxLength) {
    errors.cardNumber = "Please enter valid card number";
  }

  if (_.isEmpty(data.cardName)) {
    errors.cardName = "Please enter your card name";
  }
  if (_.isEmpty(data.cardMonth) || _.isEmpty(data.cardYear)) {
    errors.cardDate = "Please enter your card exp-date";
  }

  if (_.isEmpty(data.cardCvv)) {
    errors.cardCvv = "Please enter your card cvv";
  }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

export default validateCard;
