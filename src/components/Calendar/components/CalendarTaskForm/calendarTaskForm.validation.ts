import * as yup from 'yup';

export const calendarTaskValidationSchema = yup.object({
  title: yup.string().trim().required(),
});
