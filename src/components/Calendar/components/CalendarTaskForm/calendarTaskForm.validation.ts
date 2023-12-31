import * as yup from 'yup';

export const calendarTaskValidationSchema = yup.object({
  title: yup.string().trim().required(),
  labels: yup.array().of(
    yup.object({
      id: yup.string(),
      title: yup.string().trim().required(),
      color: yup.string().trim().required(),
      checked: yup.boolean(),
    })
  ),
});
