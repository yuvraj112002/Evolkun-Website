import React from "react";
import styles from "@/styles/modules/main.module.scss";

export default function RadioCardField({ q, value, onChange, options }) {
  return (
    <div className={styles.cardGridWrapper}>
      <div className={styles.cardGrid}>
        {options.map((opt) => {
          const inputId = `${q.name}-${opt.value}`;
          const isSelected = value === opt.value;
          return (
            <div
              key={opt.value}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
              onClick={() => {
                onChange({
                  target: {
                    name: q.name,
                    value: opt.value,
                    type: "radio",
                  },
                });
              }}
            >
              <input
                type="radio"
                id={inputId}
                name={q.name}
                value={opt.value}
                checked={isSelected}
                onChange={onChange}
                required={q.required}
                style={{ display: "none" }} // ← Inline style to hide the dot
                className="hidden"
              />
              <label htmlFor={inputId}>
                <h4>{opt.label}</h4>
                {opt.description && <p>{opt.description}</p>}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}