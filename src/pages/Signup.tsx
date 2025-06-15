import { Formik, Form} from 'formik';
import { BsPerson, BsKeyFill} from 'react-icons/bs'; // Assuming you might add password later
import * as Yup from 'yup';
import { InputField } from '../components/InputField';
import { FormFieldConfig, SignupValues } from '../interfaces';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import axiosInstance from '../axiosConfig';
import { HiOutlineMail } from 'react-icons/hi';




const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      `Password must contain:,- At least one uppercase letter,- At least one lowercase letter,- At least one number,- At least one special character (@$!%*?&)`
        )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});



// Array of input field configurations
const formFields: FormFieldConfig[] = [
    { name: 'username', label: 'Username', icon: <BsPerson /> },
    { name: 'email', label: 'Email', type: 'email', icon: <HiOutlineMail/> },
    { name: 'password', label: 'Password',type:"password",icon:<BsKeyFill/> },
    { name: 'confirmPassword', label: 'Confirm Password',type:"password",icon:<BsKeyFill/> },
];


export const Signup = () => {

  const navigate = useNavigate();

  const handleSubmit = async (values: SignupValues) => {
    try {
      const {username, email, password} = values; // Destructure the values object
      await axiosInstance.post('/auth/signup', {username,email,password});
      navigate('/auth/login'); 
    }
    catch (error) {
      console.error(error); // Handle error response
    }

  };


  return (
      <>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
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

          <p className="text-center mt-4 flex items-center justify-center">

            Already have an account? 
            <Link className='btn btn-link px-1' to="/auth/login">Log in</Link>
          </p>
      </>
    
  );
};