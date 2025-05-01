export interface InputFieldProps {
  name: string;
  label: string;
  type?: string; // Make type optional, default to 'text'
  icon?: React.ReactNode; // Allow passing an icon component
  errors: any; // Consider using more specific types from Formik if possible
  touched: any; // Consider using more specific types from Formik if possible
}

export interface FormFieldConfig {
    name: string; 
    label: string;
    type?: string;
    icon?: React.ReactNode;
}