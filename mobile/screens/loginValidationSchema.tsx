import * as yup from 'yup';

 const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Entrez un email valide")
    .required("L'email est requis"),
  password: yup
    .string()
    .min(6, ({ min }) => `Le mot de passe doit être de ${min} caractères`)
    .required('Le mot de passe est requis'),
})

export default loginValidationSchema;