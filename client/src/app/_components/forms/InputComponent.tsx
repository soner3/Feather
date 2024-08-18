import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type InputComponentType = {
  inputType: string;
  inputId: string;
  labelValue: string;
  plcaeholder: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  register: UseFormRegister<any>;
  registerSchema: string;
  required: boolean;
};

export default function InputComponent({
  labelValue,
  inputType,
  inputId,
  plcaeholder,
  error,
  errorMessage,
  register,
  registerSchema,
  required,
}: InputComponentType) {
  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className={`pl-2 ${error ? "label-error" : ""}`}>
        {labelValue} {required && "*"}
      </label>
      <input
        type={inputType}
        id={inputId}
        placeholder={plcaeholder}
        {...register(registerSchema)}
        className={`input ${error ? "error" : ""}`}
        required={required}
      />
      {error && <p className="error">{errorMessage}</p>}
    </div>
  );
}
