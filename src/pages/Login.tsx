import { Formik, Form} from 'formik';
import { BsPerson, BsEnvelope, BsKeyFill} from 'react-icons/bs'; // Assuming you might add password later
import * as Yup from 'yup';
import React from 'react'; // Import React for JSX types
import { InputField } from '../components/InputField';
import { FormFieldConfig } from '../interfaces';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';

// Define the props for the InputField component


// Reusable InputField component


const SignupSchema = Yup.object().shape({

  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),

});



// Array of input field configurations
const formFields: FormFieldConfig[] = [
    { name: 'email', label: 'Email', type: 'email', icon: <BsEnvelope /> },
    { name: 'password', label: 'Password',type:"password",icon:<BsKeyFill/> },
];


export const Login = () => {
  
  
  return (
        <>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              // same shape as initial values
              console.log(values);
            }}
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