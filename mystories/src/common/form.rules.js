import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/en.json";

export const email = () => {
  return extend("email", {
    ...rules[email], // copies rule configuration
    message: messages[email] // assign message
  });
};

export const alpha = () => {
  return extend("alpha", {
    ...rules[alpha],
    message: messages[alpha] // assign message
  });
};

export const regex = () => {
  return extend("regex", {
    ...rules[regex],
    message: messages[regex] // assign message
  });
};

export const required = () => {
  return extend("required", {
    ...rules[required],
    message: messages[required] // assign message
  });
};

export default {
  email,
  alpha,
  required,
  regex
};
