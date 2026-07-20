"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  Lock,
  LogIn,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF7FB] px-4 sm:px-6">

      {/* Background Blur */}
      <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-pink-200/40 blur-3xl"></div>

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-sky-200/40 blur-3xl"></div>

      <div className="mx-auto w-full max-w-sm rounded-[30px] border border-pink-100 bg-white p-6 sm:max-w-md sm:p-10 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="mb-5 flex justify-center">

            <div className="rounded-full bg-pink-100 p-3 sm:p-5">

              <Sparkles
                size={34}
                className="text-pink-500"
              />

            </div>

          </div>

          <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-pink-600 leading-tight">

            Student Task Planner

          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-500">

            Login untuk melanjutkan

          </p>

        </div>

        {/* Email */}
        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">

            Email

          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-pink-50 px-4 transition focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-200">

            <Mail
              size={22}
              className="text-pink-500"
            />

            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent p-4 text-gray-900 placeholder:text-gray-400 outline-none"
            />

          </div>

        </div>

        {/* Password */}
        <div className="mb-8">

          <label className="mb-2 block text-sm font-semibold text-gray-700">

            Password

          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-pink-50 px-4 transition focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-200">

            <Lock
              size={22}
              className="text-pink-500"
            />

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent p-4 text-gray-900 placeholder:text-gray-400 outline-none"
            />

          </div>

        </div>
              
        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D97A9A] py-3 sm:py-4 text-base sm:text-lg text-sm font-semibold text-white shadow-lg shadow-pink-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C96687] hover:shadow-xl active:scale-95"
        >
          <LogIn size={20} />

          Login

        </button>

        {/* Message */}
        {message && (

          <div className="mt-6 rounded-2xl bg-pink-100 p-4 text-center font-medium text-pink-700 break-words">

            {message}

          </div>

        )}

        {/* Footer */}
        <p className="mt-8 text-center text-sm sm:text-base text-gray-500">

          Belum punya akun?{" "}

          <button
            onClick={() => router.push("/register")}
            className="text-sm font-semibold text-pink-600 transition hover:text-pink-700 hover:underline"
          >

            Sign Up

          </button>

        </p>

      </div>

    </main>
  );
}