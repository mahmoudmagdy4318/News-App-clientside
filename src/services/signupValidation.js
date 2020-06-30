import joi from "joi-browser";

const schema = {
  email: joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
  password: joi.string().required().min(6).label("Password"),
  password2: joi
    .any()
    .valid(joi.ref("password"))
    .required()
    .options({ language: { any: { allowOnly: "must match password" } } })
    .label("password confirmation"),
  fullname: joi.string().required().min(5).label("Fullname"),
};

//validate all user's data with the schema
export const validate = (user) => {
  const options = { abortEarly: false };
  const { error } = joi.validate(user, schema, options);
  if (!error) return null;
  const errors = {};
  error.details.map((item) => {
    errors[item.path[0]] = item.message;
    return 0;
  });
  return errors;
};

//function to validate signup inputs
export const validateProperty = ({ name, value }) => {
  const obj = { [name]: value };
  const propertySchema = { [name]: schema[name] };
  const { error } = joi.validate(obj, propertySchema);
  return error ? error.details[0].message : null;
};
