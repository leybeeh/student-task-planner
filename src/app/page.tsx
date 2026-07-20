"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF7FB] px-6">

      <div className="pointer-events-none absolute -left-28 top-20 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl"></div>

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"></div>

      <div className="w-full max-w-5xl rounded-[40px] border border-pink-100 bg-white p-10 shadow-2xl">

        <div className="grid items-center gap-10 md:grid-cols-2">

          <div>

            <div className="mb-5 inline-flex rounded-full bg-pink-100 p-4">

              <Sparkles
                size={36}
                className="text-pink-500"
              />

            </div>

            <h1 className="text-5xl font-extrabold text-pink-600">

              Student Task Planner

            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">

              Kelola tugas kuliah, pantau deadline, dan selesaikan
              pekerjaanmu dengan lebih mudah dalam satu aplikasi.

            </p>

            <div className="mt-8 flex gap-4">

              <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-8 py-4 font-bold text-white shadow-lg shadow-pink-300 transition hover:-translate-y-1"
              >

                Login

                <ArrowRight size={20} />

              </button>

              <button
                onClick={() => router.push("/register")}
                className="rounded-2xl border-2 border-pink-400 px-8 py-4 font-bold text-pink-600 transition hover:bg-pink-50"
              >

                Sign Up

              </button>

            </div>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-4 rounded-3xl bg-pink-50 p-5">

              <BookOpen className="text-pink-500" />

              <div>

                <h3 className="font-bold">

                  Kelola Mata Kuliah

                </h3>

                <p className="text-gray-500">

                  Simpan tugas berdasarkan mata kuliah.

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-3xl bg-sky-50 p-5">

              <Clock3 className="text-sky-500" />

              <div>

                <h3 className="font-bold">

                  Pantau Deadline

                </h3>

                <p className="text-gray-500">

                  Jangan sampai ada tugas yang terlewat.

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-3xl bg-green-50 p-5">

              <CheckCircle2 className="text-green-500" />

              <div>

                <h3 className="font-bold">

                  Tandai Selesai

                </h3>

                <p className="text-gray-500">

                  Lihat progres tugasmu kapan saja.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}