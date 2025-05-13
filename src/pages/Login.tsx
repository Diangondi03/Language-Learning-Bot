import { Formik, Form} from 'formik';
import { BsEnvelope, BsKeyFill} from 'react-icons/bs'; 
import * as Yup from 'yup';
import { InputField } from '../components/InputField';
import { FormFieldConfig, LoginValues } from '../interfaces';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import axiosInstance from '../axiosConfig';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';



const SignupSchema = Yup.object().shape({

  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required'),

});

const formFields: FormFieldConfig[] = [
    { name: 'email', label: 'Email', type: 'email', icon: <BsEnvelope /> },
    { name: 'password', label: 'Password',type:"password",icon:<BsKeyFill/> },
];



export const Login = () => {
  const loginError = useSignal<string>("");
  useSignals()
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginValues) => {
    try {
      const res = await axiosInstance.post('/auth/login', values);
      localStorage.setItem('token', res.data.token); // Store the token in local storage
      navigate('/app'); 
    }
    catch (error) {
      loginError.value = "Invalid email or password"; // Set error message
      console.error(error); // Handle error response
    }

  };
  
  return (
        <>
          <h1 className="text-md text-center text-error">{loginError}</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                {formFields.map((field) => (
                    <InputField
                    key={field.name} // Add key prop for list rendering
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    icon={field.icon}
                    errors={errors}
                    touched={touched}
                    />
                ))}

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary w-full">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex w-full flex-col">
            <div className="divider">OR</div>
            <button className="btn btn-outline w-full">
              <FcGoogle/>
              Log in with Google
            </button>
          </div>
            <p className="text-center mt-4 flex items-center justify-center">
            Don't have an account?
            <Link className='btn btn-link px-1' to="/auth/signup">Sign up</Link>
            </p>
        </>
    
  );
};