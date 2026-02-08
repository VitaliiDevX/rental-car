"use client";

import { useState, useMemo } from "react";
import Select, {
  StylesConfig,
  GroupBase,
  components,
  SingleValueProps,
  DropdownIndicatorProps,
} from "react-select";
import css from "./SearchBox.module.css";
import { CarFilters } from "@/types/car";
import Button from "../Button/Button";

interface Option {
  value: string;
  label: string;
}

interface SearchBoxProps {
  brands: string[];
  onSearch: (filters: CarFilters) => void;
  isLoading?: boolean;
  initialFilters: CarFilters;
}

interface MileageState {
  from: string;
  to: string;
}

const CustomSingleValue = ({
  children,
  ...props
}: SingleValueProps<Option, false>) => {
  const isResetOption = props.data.value === "";

  return (
    <components.SingleValue {...props}>
      {isResetOption ? children : `To $${children}`}
    </components.SingleValue>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <svg width="16" height="16">
        <use href={`/sprite.svg#${menuIsOpen ? "arrow-act" : "arrow-def"}`} />
      </svg>
    </components.DropdownIndicator>
  );
};

export default function SearchBox({
  brands,
  onSearch,
  isLoading,
  initialFilters,
}: SearchBoxProps) {
  const [brand, setBrand] = useState<Option | null>(
    initialFilters.brand
      ? { value: initialFilters.brand, label: initialFilters.brand }
      : null,
  );

  const [price, setPrice] = useState<Option | null>(
    initialFilters.rentalPrice
      ? { value: initialFilters.rentalPrice, label: initialFilters.rentalPrice }
      : null,
  );

  const [mileage, setMileage] = useState<MileageState>({
    from: initialFilters.minMileage || "",
    to: initialFilters.maxMileage || "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSearchClick = () => {
    const min = parseInt(mileage.from) || 0;
    const max = parseInt(mileage.to) || Infinity;

    if (mileage.from && mileage.to && min > max) {
      setError("Min mileage cannot exceed max mileage");
      return;
    }

    setError(null);
    onSearch({
      brand: brand?.value ?? "",
      rentalPrice: price?.value ?? "",
      minMileage: mileage.from,
      maxMileage: mileage.to,
    });
  };

  // Форматуємо і запам'ятовуємо бренди для селекта
  const brandOptions = useMemo(() => {
    const options = brands.map((name) => ({ value: name, label: name }));
    return [{ value: "", label: "All brands" }, ...options];
  }, [brands]);

  // Створюємо і запам'ятовуємо ціни для селекта
  const priceOptions = useMemo(() => {
    const options = Array.from({ length: 15 }, (_, i) => ({
      value: String((i + 1) * 10),
      label: `${(i + 1) * 10}`,
    }));
    return [{ value: "", label: "Any price" }, ...options];
  }, []);

  const getStyles = (
    height: string,
  ): StylesConfig<Option, false, GroupBase<Option>> => ({
    // Поле введення
    control: (base) => ({
      ...base,
      backgroundColor: "var(--color-inputs)",
      borderRadius: "12px",
      border: "none",
      minHeight: "44px",
      boxShadow: "none",
      padding: "12px 16px",
      cursor: "pointer",
    }),

    // Скидаємо зайві відступи
    valueContainer: (base) => ({
      ...base,
      padding: "0",
      margin: "0",
      paddingRight: "8px",
    }),

    // Скидаємо відступи вводу
    input: (base) => ({
      ...base,
      display: "none",
    }),

    // Прибираємо зайві відступи у іконки
    dropdownIndicator: (base) => ({
      ...base,
      padding: "0",
    }),

    // Прибираємо зайві деталі бібліотеки
    indicatorSeparator: () => ({ display: "none" }),

    // Головний контейнер випадаючого списку
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--color-white)",
      border: "1px solid var(--color-inputs)",
      borderRadius: "12px",
      boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02);",
      marginTop: "4px",
      padding: "14px 8px 14px 18px",
      zIndex: 100,
      height: "auto",
    }),

    // Внутрішній список
    menuList: (base) => ({
      ...base,
      boxSizing: "border-box",
      padding: "0",
      maxHeight: `calc(${height} - 28px)`,

      // Стилізація скролбару
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        background: "var(--color-gray-light)",
        borderRadius: "10px",
      },
      // Прибираємо стрілочки зверху і знизу
      "::-webkit-scrollbar-button": {
        display: "none",
      },
    }),

    // Стилі окремих рядків списку
    option: (base, state) => ({
      ...base,
      borderRadius: "8px",
      backgroundColor: "transparent",
      color: state.isSelected ? "var(--color-main)" : "var(--color-gray)",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "1.25",
      padding: "4px 0",
      cursor: "pointer",
      "&:hover": {
        color: "#121417",
      },
    }),

    placeholder: (base) => ({
      ...base,
      fontFamily: "var(--font-main)",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "1.25",
      color: "var(--color-main)",
      margin: "0",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
    }),

    // Стиль для тексту, який вже вибраний
    singleValue: (base) => ({
      ...base,
      fontFamily: "var(--font-main)",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "1.25",
      color: "var(--color-main)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
    }),
  });

  // Функція для додавання ком
  const formatNumber = (value: string) => {
    if (!value) return "";
    // Додає коми роздільники тисяч до рядка цифр
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMileageChange = (name: keyof MileageState, value: string) => {
    // Видаляємо все, крім цифр
    const onlyNumbers = value.replace(/\D/g, "");

    // Обмежуємо довжину
    if (onlyNumbers.length <= 8) {
      setMileage((prev) => ({ ...prev, [name]: onlyNumbers }));
    }
  };

  return (
    <div className={css.container}>
      <div className={css.fieldWrapper} style={{ width: "204px" }}>
        <label className={css.label} htmlFor="brand-select-input">
          Car brand
        </label>
        <Select
          instanceId="brand-select"
          inputId="brand-select-input"
          options={brandOptions}
          blurInputOnSelect={true}
          backspaceRemovesValue={false}
          placeholder="Choose a brand"
          styles={getStyles("272px")}
          value={brand}
          onChange={setBrand}
          isSearchable={false}
          openMenuOnFocus={true}
          tabSelectsValue={false}
          components={{ DropdownIndicator }}
        />
      </div>

      <div className={css.fieldWrapper} style={{ width: "196px" }}>
        <label className={css.label} htmlFor="price-select-input">
          Price / 1 hour
        </label>
        <Select
          instanceId="price-select"
          inputId="price-select-input"
          options={priceOptions}
          blurInputOnSelect={true}
          backspaceRemovesValue={false}
          placeholder="Choose a price"
          styles={getStyles("188px")}
          value={price}
          onChange={setPrice}
          isSearchable={false}
          openMenuOnFocus={true}
          tabSelectsValue={false}
          components={{
            DropdownIndicator,
            SingleValue: CustomSingleValue,
          }}
        />
      </div>
      <div className={css.fieldWrapper}>
        <p id="mileage-group-label" className={css.label}>
          Car mileage / km
        </p>

        <div className={css.mileageContainer}>
          <div className={css.mileageInputWrapper}>
            <label htmlFor="mileage-from" className={css.inputPrefix}>
              From
            </label>
            <input
              id="mileage-from"
              type="text"
              className={css.mileageInput}
              aria-labelledby="mileage-group-label"
              value={formatNumber(mileage.from)}
              onChange={(e) => handleMileageChange("from", e.target.value)}
            />
          </div>

          <div className={css.mileageInputWrapper}>
            <label htmlFor="mileage-to" className={css.inputPrefix}>
              To
            </label>
            <input
              id="mileage-to"
              type="text"
              className={css.mileageInput}
              aria-labelledby="mileage-group-label"
              value={formatNumber(mileage.to)}
              onChange={(e) => handleMileageChange("to", e.target.value)}
            />
          </div>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </div>
      <Button
        className={css.searchBtn}
        onClick={handleSearchClick}
        isLoading={isLoading}
        loadingText="Searching..."
      >
        Search
      </Button>
    </div>
  );
}
