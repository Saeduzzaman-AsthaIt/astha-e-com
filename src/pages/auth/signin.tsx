import { signIn } from "next-auth/react";
import React, { useState } from "react";

enum Validators {
}
type FormControl = {[key: string]: {value?: any, touched?: boolean, errors?: string, label?: string}};
const SignIn = () => {
  const formControls: FormControl = {
    username: {
      value: "",
      touched: false,
      errors: "",
      label: "User name"
    },
    password: {
      value: "",
      touched: false,
      errors: "",
      label: "Password"
    }
  }
  const [controls, updateControls] = useState<FormControl>(formControls);

  const onFormControlValueChange = (e: any) => {
    const {name, value} = e.target;
    controls[name].touched = true;
    controls[name].value = value;
    if(!value) {
      controls[name].errors = `${controls[name].label} is required`;
    } else {
      controls[name].errors = "";
    }

    updateControls({...controls});
  }

  const onFormControlFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const {name} = e.target;
    if(!controls[name].touched) {
      controls[name].touched = true;
      controls[name].errors = `${controls[name].label} is required`;
      updateControls({...controls});
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      username: controls.username?.value,
      password: controls.password?.value,
      redirect: true
    });

    if(!result?.error) {
      window.location.href = "/";
    }
  }

  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">User Name</label>
          <input
            type="text"
            name="username"
            value={controls?.username?.value}
            onChange={(e) => onFormControlValueChange(e)}
            onFocus={onFormControlFocus}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
          {controls?.username?.errors && controls?.username?.touched && <p className="text-red-500">{controls?.username?.errors}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={controls?.password?.value}
            onChange={(e) => onFormControlValueChange(e)}
            onFocus={onFormControlFocus}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
          {controls?.password?.errors && controls?.password?.touched && <p className="text-red-500">{controls?.password?.errors}</p>}
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-900">
          Sign In
        </button>
      </form>
    </div>
    </>
  )
}

export default SignIn;