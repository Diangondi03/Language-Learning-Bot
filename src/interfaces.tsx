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

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignupValues {
  username: string;
  email: string;
  password: string;
}

export interface User{
  id: number;
  username: string;
  email: string;
}

export interface Chat{
  chat_id:number;
  date:string;
  title:string;
  user_id: number;

}

export interface Message {
  content: string;
  chatId: string;
  is_user: boolean;

}

