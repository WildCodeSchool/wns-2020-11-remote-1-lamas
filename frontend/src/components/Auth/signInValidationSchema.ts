import * as yup from 'yup';

const signInValidationSchema = yup.object().shape({
  firstname: yup.string().required('Votre prénom est requis'),
  lastname: yup.string().required('Votre nom est requis'),
  email: yup
    .string()
    .email('Entrez un email valide')
    .required("L'email est requis"),
  password: yup
    .string()
    .min(
      6,
      ({ min }) => `Le mot de passe doit contenir ${min} caractères minimum`
    )
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Le mot de passe doit contenir 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial'
    )
    .required('Le mot de passe est requis'),
});

export default signInValidationSchema;
