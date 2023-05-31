import { useState } from 'react';

import { Form, Field, Formik, FormikHelpers } from 'formik';
import { useAuth } from '../hooks/useAuth';

import { ISignIn } from '../interfaces/global';

import * as yup from 'yup';

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);

  const signInSchema = yup.object().shape({
    cpf: yup
      .string()
      .trim()
      .matches(
        /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/
      ),
    password: yup.string().required(),
  });

  const { signIn, setIsLoading, isLoading } = useAuth();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-white p-8 pt-[4.5rem] shadow-none md:min-h-[33.75rem] md:w-[33.5rem] md:p-16 md:shadow-xl">
        <h1 className="text-center text-5xl font-normal">Entrar</h1>
        <p className="text-center text-lg font-light">
          Conecte-se, compartilhe, transforme.
        </p>

        <Formik
          initialValues={{ cpf: '', password: '' }}
          validationSchema={signInSchema}
          onSubmit={(values, { setSubmitting }: FormikHelpers<ISignIn>) => {
            setIsLoading(true);
            signIn({
              cpf: values.cpf,
              password: values.password,
            });
            setSubmitting(true);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full flex-col">
              <div className="relative mb-5 gap-2">
                <label
                  htmlFor="CPF"
                  className="mb-2 block text-sm font-normal text-gray-200"
                >
                  CPF
                </label>
                <div className="pointer-events-none absolute inset-y-[3.2rem] left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5  text-gray-400"
                    fill="none"
                    height="26"
                    viewBox="0 0 38 26"
                    width="38"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.8 25H5.10001C3.10001 25 1.39999 23.3 1.39999 21.3V4.70001C1.39999 2.70001 3.10001 1 5.10001 1H32.8C34.8 1 36.5 2.70001 36.5 4.70001V21.3C36.5 23.3 34.9 25 32.8 25Z"
                      stroke="#4F4F4F"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                    <path
                      d="M11.6 11.3C13.2569 11.3 14.6 10.0016 14.6 8.39999C14.6 6.79837 13.2569 5.5 11.6 5.5C9.94315 5.5 8.60001 6.79837 8.60001 8.39999C8.60001 10.0016 9.94315 11.3 11.6 11.3Z"
                      stroke="#4F4F4F"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                    <path
                      d="M15.6 20.4H7.60001C6.80001 20.4 6.10001 19.7 6.10001 18.9V16.3C6.10001 14.2 7.79999 12.5 9.89999 12.5H13.3C15.4 12.5 17.1 14.2 17.1 16.3V18.9C17.2 19.7 16.5 20.4 15.6 20.4Z"
                      stroke="#4F4F4F"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                    <path
                      d="M21.8 7.5H31.9"
                      stroke="#4F4F4F"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                    <path
                      d="M21.8 11.2H31.9"
                      stroke="#4F4F4F"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                    <path
                      d="M21.8 14.8H31.9"
                      stroke="#4F4F4F"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                    <path
                      d="M21.8 18.5H31.9"
                      stroke="#4F4F4F"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <Field
                  type="text"
                  name="cpf"
                  id="cpf"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-700 bg-white bg-clip-padding px-4 py-3 pl-10 text-sm font-normal text-gray-400 transition ease-in-out invalid:border-red-600 invalid:text-red-600 focus:border-blue-600 focus:text-gray-400 focus:outline-none"
                  placeholder="CPF"
                  autoFocus
                  required
                />
                {errors.cpf && touched.cpf && (
                  <span className="text-xs font-medium tracking-tighter text-red-500">
                    Você precisa digitar um CPF válido
                  </span>
                )}
              </div>

              <div className="relative mb-5 gap-2">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-normal text-gray-200"
                >
                  Senha
                </label>
                <div className="pointer-events-none absolute inset-y-[3.2rem] left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    ></path>
                  </svg>
                </div>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control m-0 block w-full rounded border border-solid border-gray-700 bg-white bg-clip-padding px-4 py-3 pl-10 text-sm font-normal text-gray-400 transition ease-in-out invalid:border-red-600 invalid:text-red-600 focus:border-blue-600 focus:text-gray-400 focus:outline-none"
                  placeholder="Senha"
                />
                {showPassword ? (
                  <div onClick={() => setShowPassword(!showPassword)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="left-50 absolute right-3 top-10 h-5 w-5 cursor-pointer text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </div>
                ) : (
                  <div onClick={() => setShowPassword(!showPassword)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="left-50 absolute right-3 top-10 h-5 w-5 cursor-pointer text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                )}
                {errors.password && touched.password && (
                  <span className="text-xs font-medium tracking-tighter text-red-500">
                    Você precisa digitar sua senha
                  </span>
                )}
              </div>

              <div className="flex w-full flex-col justify-center gap-5">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-sm bg-gray-700 p-3 font-normal normal-case text-white transition delay-75 ease-in-out hover:bg-gray-800 hover:opacity-80"
                >
                  {isLoading ? (
                    <svg
                      className="h-5 w-5 animate-spin text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={4}
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    'Entrar'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
