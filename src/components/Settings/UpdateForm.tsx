import { FormFieldConfig, SignupValues } from "../../interfaces";
import { BsKeyFill, BsPerson } from "react-icons/bs";
import { Form, Formik } from "formik";
import { InputField } from "../InputField";
import * as Yup from 'yup';
import { updateMessage, user } from "../../signals"
import axiosInstance from "../../axiosConfig";
import { useSignals } from "@preact/signals-react/runtime";
import { HiOutlineMail } from "react-icons/hi";


const formFields: FormFieldConfig[] = [
    { name: 'username', label: 'Username', icon: <BsPerson /> },
    { name: 'email', label: 'Email', type: 'email', icon: <HiOutlineMail /> },
    { name: 'password', label: 'Password',type:"password",icon:<BsKeyFill/> },
    { name: 'confirmPassword', label: 'Confirm Password',type:"password",icon:<BsKeyFill/> },
];

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .test(
            'password-optional',
            "Password must contain:,- At least one uppercase letter,- At least one lowercase letter,- At least one number,- At least one special character (@$!%*?&)",
            value => {
                if (!value) return true; // allow empty
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            }
        ),
    confirmPassword: Yup.string()
        .when('password', {
            is: (val: string) => !!val,
            then: schema => schema
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required'),
            otherwise: schema => schema.notRequired()
        }),
});


const UpdateForm = () => {
    useSignals()



    const handleSubmit = async (values: SignupValues) => {
        const { username, email, password } = values;
        const updatedUser = {
            username,
            email,
            password: password || undefined, // Only include password if it's provided
        };

        try {
            const response = await axiosInstance.patch('/user', updatedUser);

            if(response.data.message === "User updated successfully" && user.value) {
                user.value.username = username;
                user.value.email = email;
                localStorage.setItem('token', response.data.token);
            }
            updateMessage.value = response.data.message;

        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
              // @ts-ignore
              updateMessage.value = error.response.data.message;
            } else {
              updateMessage.value = "An unknown error occurred.";
            }
          }
        setTimeout(() => {
            updateMessage.value = "";
        }, 3000);
    }

    return (
        <>
            <h2 className="text-2xl text-center my-5">Update your data</h2>
            <label className="label">
            {updateMessage.value && (
                <span className={`label-text-alt ${updateMessage.value=="User updated successfully" ? "text-success" : "text-error"}`}>{updateMessage}</span>
            )}
                
            </label>
            <Formik
            initialValues={{
                username: user.value?.username ?? '',
                email: user.value?.email ?? '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            >
            {({ errors, touched }) => (
                <Form className="space-y-5 w-75">
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
        </>
    )
}

export default UpdateForm