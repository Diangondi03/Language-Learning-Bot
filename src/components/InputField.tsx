import { Field } from "formik";
import { InputFieldProps } from "../interfaces";

export const InputField: React.FC<InputFieldProps> = ({ name, label, type = 'text', icon, errors, touched }) => (
  <div className="form-control">
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <label  className={`input input-bordered flex items-center gap-2 ${errors[name] && touched[name] ? 'input-error' : ''}`}>
      {icon}
      <Field id={name} name={name} type={type} className="grow" placeholder={label} />
    </label>
    {errors[name] && touched[name] ? (
      <label className="label">
        <span className="label-text-alt text-error">{errors[name]}</span>
      </label>
    ) : null}
  </div>
);