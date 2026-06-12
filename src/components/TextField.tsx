import { type InputHTMLAttributes, type ReactNode, useId } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
};

export function TextField({
  label,
  description,
  error,
  className = "",
  id,
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  return (
    <label
      htmlFor={inputId}
      className={`flex flex-col gap-1 text-sm ${className}`}
    >
      <span>{label}</span>
      <input
        id={inputId}
        aria-describedby={[descId, errId].filter(Boolean).join(" ") || undefined}
        aria-invalid={error ? true : undefined}
        className="rounded-md border border-zinc-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
        {...rest}
      />
      {description && (
        <span id={descId} className="text-xs text-zinc-500">
          {description}
        </span>
      )}
      {error && (
        <span id={errId} role="alert" className="text-xs text-rose-600">
          {error}
        </span>
      )}
    </label>
  );
}
