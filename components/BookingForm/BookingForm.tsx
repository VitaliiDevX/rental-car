import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import clsx from "clsx";
import css from "./BookingForm.module.css";
import Calendar from "../Calendar/Calendar";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Button from "../Button/Button";

interface FormValues {
  name: string;
  email: string;
  date: [Date | null, Date | null];
  comment: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  date: [null, null],
  comment: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(
      /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?/-]+$/,
      "Name must use Latin letters and can include numbers or special characters (Cyrillic is not allowed)",
    ),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is invalid (dots are not allowed before @)",
    ),

  comment: Yup.string()
    .min(3, "Comment must contain at least 3 characters")
    .max(500, "Max 500 chars"),
});

export default function BookingForm() {
  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      setSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Car successfully booked!");
      resetForm();
    } catch {
      toast.error("Something went wrong...");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formWrapper}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form className={css.form}>
            <div className={css.inputContainer}>
              <label htmlFor="user-name" className={css.visuallyHidden}>
                Name
              </label>
              <Field
                id="user-name"
                className={clsx(css.input, {
                  [css.errorInput]: errors.name && touched.name,
                })}
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Name*"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.inputContainer}>
              <label htmlFor="user-email" className={css.visuallyHidden}>
                Email
              </label>
              <Field
                id="user-email"
                className={clsx(css.input, {
                  [css.errorInput]: errors.email && touched.email,
                })}
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.inputContainer}>
              <label
                htmlFor="booking-date-input"
                className={css.visuallyHidden}
              >
                Booking date
              </label>
              <Calendar
                values={values.date}
                setFieldValue={setFieldValue}
                name="date"
              />
            </div>

            <div className={css.textareaContainer}>
              <label htmlFor="user-comment" className={css.visuallyHidden}>
                Comment
              </label>
              <Field
                id="user-comment"
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={css.textarea}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={css.error}
              />
            </div>

            <Button
              className={css.submitBtn}
              type="submit"
              isLoading={isSubmitting}
              loadingText="Sending..."
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
