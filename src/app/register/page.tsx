"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  Lock,
  UserPlus,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister() {
  const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: "https://task-planner-kein.vercel.app/auth/callback",
  },
});

  if (error) {
    setMessage(error.message);
  } else {
    setMessage(
      "🌸 Registrasi berhasil! Silakan cek email Anda untuk verifikasi akun."
    );
  }
}

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF7FB] px-4 sm:px-6">

      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-pink-200/40 blur-3xl"></div>

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-sky-200/40 blur-3xl"></div>

      <div className="mx-auto w-full max-w-sm rounded-[30px] border border-pink-100 bg-white p-6 sm:max-w-md sm:p-10 shadow-xl">

        <div className="mb-8 text-center">

          <div className="mb-4 flex justify-center">

            <div className="rounded-full bg-pink-100 p-3 sm:p-4">

              <Sparkles
                size={34}
                className="text-pink-500"
              />

            </div>

          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-pink-600 leading-tight">

            Student Task Planner

          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500">

            Buat akun baru untuk memulai

          </p>

        </div>

        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">

            Email

          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-pink-50 px-4">

            <Mail
              size={20}
              className="text-pink-500"
            />

            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent p-3 sm:p-4 text-gray-900 caret-pink-600 placeholder:text-gray-400 outline-none"
            />

          </div>

        </div>

        <div className="mb-6">

          <label className="mb-2 block text-sm font-semibold text-gray-700">

            Password

          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-pink-50 px-4">

            <Lock
              size={20}
              className="text-pink-500"
            />

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent p-3 sm:p-4 text-gray-900 caret-pink-600 placeholder:text-gray-400 outline-none"
            />

          </div>

        </div>

        <button
          onClick={handleRegister}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D97A9A] py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-pink-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C96687] hover:shadow-xl active:scale-95"
        >
          <UserPlus size={20} />

          Daftar
        </button>

        {message && (

          <div className="mt-5 rounded-2xl bg-pink-100 p-4 text-center font-medium text-pink-700 break-words">

            {message}

          </div>

        )}

        <p className="mt-8 text-center text-sm sm:text-base text-gray-500">

          Sudah punya akun?{" "}

          <button
            onClick={() => router.push("/login")}
            className="font-semibold text-pink-600 hover:underline"
          >
            Login
          </button>

        </p>

      </div>

    </main>
  );
}