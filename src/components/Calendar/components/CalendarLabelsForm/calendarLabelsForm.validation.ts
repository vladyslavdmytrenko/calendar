import * as yup from 'yup';

export const calendarLabelsValidationSchema = yup.object().shape({
  labels: yup.array().of(
    yup.object({
      storeId: yup.string(),
      title: yup.string().trim().required(),
      color: yup.string().trim().required(),
    })
  ),
});
