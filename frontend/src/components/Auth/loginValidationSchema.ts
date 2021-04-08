import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup.string().required("L'email est requis"),
  password: yup.string().required('Le mot de passe est requis'),
});

export default loginValidationSchema;
