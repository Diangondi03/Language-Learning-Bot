import { Field } from "formik";
import { InputFieldProps } from "../interfaces";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useSignal, useSignals } from "@preact/signals-react/runtime";

export const InputField: React.FC<InputFieldProps> = ({ name, label, type = 'text', icon, errors, touched }) => {
  const inputType = useSignal<string>(type);
  useSignals()
  const toggleInputType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputType.value === 'password') {
      inputType.value = 'text';
    } else {
      inputType.value = 'password';
    }
  }

  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <label  className={`input input-bordered flex items-center gap-2 w-full dark:bg-neutral-800 ${errors[name] && touched[name] ? 'input-error' : ''}`}>
        {icon}
        <Field id={name} name={name} type={inputType} className="grow" placeholder={name} />
        {type === 'password' && (
          <button className="cursor-pointer" onClick={toggleInputType}>
            {
              inputType.value === 'password' ? <MdVisibility className="text-xl" /> : <MdVisibilityOff className="text-xl" style={{ transform: 'rotate(180deg)' }} />
            }
          </button>
              )}

      </label>
      <div className="flex flex-col w-1/2">

      {errors[name] && touched[name] ? (
        errors[name].split(',').map((error: string, index: number) => (
          <label key={index} className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
          
        ))
        
      ) : null}
      </div>
      
    </div>
);
}