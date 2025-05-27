import * as yup from "yup";

export const SearchAddressSchema = yup.object({
  username: yup.string().required("Username é obrigatório"),
  displayName: yup.string().required("Display name é obrigatório"),
  postalCode: yup
    .string()
    .required("Postal code é obrigatório")
    .matches(/^[0-9]{5}-?[0-9]{3}$/, "Formato de CEP inválido"),
});

export type FormSearchAddressSchemaValues = yup.InferType<
  typeof SearchAddressSchema
>;
