"use client";

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./Calendar.module.css";

interface CalendarProps {
  values: [Date | null, Date | null];
  setFieldValue: (field: string, value: [Date | null, Date | null]) => void;
  name?: string;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, onChange, id, name }, ref) => (
    <div onClick={onClick}>
      <input
        id={id}
        name={name}
        className={css.dateInput}
        readOnly
        placeholder="Booking date"
        value={value}
        onChange={onChange}
        ref={ref}
        aria-label="Select booking date range"
      />
    </div>
  ),
);

CustomInput.displayName = "CustomInput";

export default function Calendar({
  values,
  setFieldValue,
  name = "date",
}: CalendarProps) {
  const [startDate, endDate] = values;

  return (
    <DatePicker
      id="booking-date-input"
      name={name}
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update: [Date | null, Date | null]) => {
        setFieldValue(name, update);
      }}
      filterDate={(date) => date >= new Date(new Date().setHours(0, 0, 0, 0))}
      formatWeekDay={(name) => name.substring(0, 3).toUpperCase()}
      shouldCloseOnSelect={true}
      customInput={<CustomInput />}
      dateFormat="dd/MM/yyyy"
      calendarStartDay={1}
      popperPlacement="bottom"
      previousMonthButtonLabel={
        <svg className={css.arrowLeft} width="24" height="24">
          <use href="/sprite.svg#arrow-left" />
        </svg>
      }
      nextMonthButtonLabel={
        <svg className={css.arrowRight} width="24" height="24">
          <use href="/sprite.svg#arrow-right" />
        </svg>
      }
    />
  );
}
