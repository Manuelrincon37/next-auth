"use client";

import axios, { Axios, AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    try {
      const signupResponse = await axios.post("/api/auth/singup", {
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      console.log(signupResponse);

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard");

      console.log(res);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form
        className="bg-neutral-950 px-8 py-10 w-3/12"
        onSubmit={handleSubmit}
      >
        {error && <p className="bg-red-500 text-white p-2 mb-2">{error}</p>}
        <h1 className="text-4xl font-bold mb-7">Singup</h1>

        <input
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          type="text"
          name="fullname"
          placeholder="John Doe"
        />
        <input
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          type="email"
          name="email"
          placeholder="example@mail.com"
        />
        <input
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          type="password"
          name="password"
          placeholder="******"
        />
        <button className="bg-indigo-500 px-4 py-2 ">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
