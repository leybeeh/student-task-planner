"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LogOut,
  Pencil,
  Trash2,
  CheckCircle2,
  ClipboardList,
  BookOpen,
  CalendarDays,
  Search,
  Sparkles,
} from "lucide-react";

type Task = {
  id: number;
  mata_kuliah: string;
  nama_tugas: string;
  deadline: string;
  is_completed: boolean;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [mataKuliah, setMataKuliah] = useState("");
  const [namaTugas, setNamaTugas] = useState("");
  const [deadline, setDeadline] = useState("");

  const [message, setMessage] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editMataKuliah, setEditMataKuliah] = useState("");
  const [editNamaTugas, setEditNamaTugas] = useState("");
  const [editDeadline, setEditDeadline] = useState("");

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setEmail(user.email ?? "");
  }

  async function loadTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("deadline", {
      ascending: true,
    });

  if (!error) {
    setTasks(data || []);
  }
}

  useEffect(() => {
    checkUser();
    loadTasks();
  }, []);

  async function handleAddTask() {
    if (!mataKuliah.trim() || !namaTugas.trim()) return;

    const { error } = await supabase
      .from("tasks")
      .insert([
        {
          mata_kuliah: mataKuliah,
          nama_tugas: namaTugas,
          deadline,
          is_completed: false,
        },
      ]);

    if (!error) {
      setMataKuliah("");
      setNamaTugas("");
      setDeadline("");

      setMessage("🌸 Tugas berhasil ditambahkan");

      loadTasks();

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }

  async function toggleComplete(id: number, status: boolean) {
    await supabase
      .from("tasks")
      .update({
        is_completed: !status,
      })
      .eq("id", id);

    loadTasks();
  }

  async function handleDelete(id: number) {
    await supabase.from("tasks").delete().eq("id", id);

    loadTasks();
  }

  async function handleUpdate(id: number) {
    await supabase
      .from("tasks")
      .update({
        mata_kuliah: editMataKuliah,
        nama_tugas: editNamaTugas,
        deadline: editDeadline,
      })
      .eq("id", id);

    setEditingId(null);

    loadTasks();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const keyword = search.toLowerCase();

      return (
        task.mata_kuliah.toLowerCase().includes(keyword) ||
        task.nama_tugas.toLowerCase().includes(keyword)
      );
    });
  }, [tasks, search]);

  const totalTask = tasks.length;

  const completedTask = tasks.filter(
    (task) => task.is_completed
  ).length;

  const progress =
  totalTask === 0
    ? 0
    : Math.round((completedTask / totalTask) * 100);

  const totalMatkul = new Set(
    tasks.map((task) => task.mata_kuliah)
  ).size;

  return (
    <main className="min-h-screen bg-[#FFF7FB]">
      <nav className="sticky top-0 z-50 border-b border-pink-100 bg-[#B7E3F8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div>
            <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-pink-600">
              <Sparkles className="text-pink-500" />
              Student Task Planner
            </h1>

            <p className="mt-1 text-sm sm:text-base text-gray-600">
              Kelola tugas kuliahmu dengan mudah
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <div className="w-full rounded-full bg-white px-5 py-2 text-center font-medium text-gray-700 shadow sm:w-auto">
              <p className="truncate">
                {email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F7B4CF] px-5 py-3 font-semibold text-white transition hover:scale-105 sm:w-auto"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-[35px] bg-white p-6 sm:p-10 shadow-lg">
         <h2 className="text-3xl sm:text-4xl font-bold text-pink-600">
            Halo 
          </h2>

          <p className="mt-2 text-gray-500">
            Selamat datang di Student Task Planner.
            Kelola seluruh tugas kuliah berdasarkan mata kuliah,
            deadline, dan status penyelesaiannya.
          </p>
        </div>
                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[30px] bg-white p-6 shadow-lg">
            <BookOpen
              size={40}
              className="mb-4 text-pink-500"
            />

            <h2 className="text-4xl font-bold">
              {totalMatkul}
            </h2>

            <p className="mt-2 text-gray-500">
              Mata Kuliah
            </p>
          </div>

          <div className="rounded-[30px] bg-white p-6 shadow-lg">
            <ClipboardList
              size={40}
              className="mb-4 text-sky-500"
            />

            <h2 className="text-4xl font-bold">
              {totalTask}
            </h2>

            <p className="mt-2 text-gray-500">
              Total Tugas
            </p>
          </div>

          <div className="rounded-[30px] bg-white p-6 shadow-lg">
            <CheckCircle2
              size={40}
              className="mb-4 text-green-500"
            />

            <h2 className="text-4xl font-bold">
              {completedTask}
            </h2>

            <p className="mt-2 text-gray-500">
              Completed
            </p>
          </div>
        </div>

        <div className="rounded-[35px] bg-white p-8 shadow-lg">
          <div className="mb-10 rounded-[30px] bg-white p-6 shadow-lg">
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-xl font-bold text-pink-600">
      Progress Tugas
    </h2>

    <span className="font-semibold text-pink-600">
      {progress}%
    </span>
  </div>

  <div className="h-4 overflow-hidden rounded-full bg-pink-100">
    <div
      className="h-full rounded-full bg-pink-500 transition-all duration-500"
      style={{
        width: `${progress}%`,
      }}
    />
  </div>

  <p className="mt-3 text-gray-500">
    {completedTask} dari {totalTask} tugas telah selesai.
  </p>
</div>
          <h2 className="mb-6 text-2xl font-bold text-pink-600">
            🌸 Tambah Tugas Baru
          </h2>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                📚 Mata Kuliah
              </label>

              <input
                type="text"
                value={mataKuliah}
                onChange={(e) =>
                  setMataKuliah(e.target.value)
                }
                placeholder="Contoh: Keamanan Informasi"
                className="w-full rounded-2xl border border-pink-200 p-4 outline-none transition focus:border-pink-400"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                📝 Nama Tugas
              </label>

              <input
                type="text"
                value={namaTugas}
                onChange={(e) =>
                  setNamaTugas(e.target.value)
                }
                placeholder="Contoh: Membuat Website UAS"
                className="w-full rounded-2xl border border-pink-200 p-4 outline-none transition focus:border-pink-400"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                📅 Deadline
              </label>

              <input
                type="date"
                value={deadline}
                onChange={(e) =>
                  setDeadline(e.target.value)
                }
                className="w-full rounded-2xl border border-pink-200 p-4 outline-none transition focus:border-pink-400"
              />
            </div>
          </div>

          <button
            onClick={handleAddTask}
            className="mt-6 w-full rounded-2xl bg-[#F7B4CF] py-4 text-lg font-semibold text-white transition hover:scale-[1.02]"
          >
            Tambah Tugas
          </button>

          {message && (
            <div className="mt-5 rounded-2xl bg-pink-100 p-4 text-center font-semibold text-pink-700">
              {message}
            </div>
          )}
        </div>
                <div className="mt-10 rounded-[35px] bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-pink-600">
              📋 Daftar Tugas
            </h2>

            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Cari mata kuliah atau tugas..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-2xl border border-pink-200 py-3 pl-12 pr-4 outline-none transition focus:border-pink-400"
              />
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-pink-200 py-16 text-center">
              <BookOpen
                size={55}
                className="mx-auto mb-4 text-pink-300"
              />

              <h3 className="text-2xl font-bold text-gray-700">
                Belum ada tugas
              </h3>

              <p className="mt-2 text-gray-500">
                Tambahkan tugas pertamamu 🌸
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-[30px] border border-pink-100 bg-[#FFFDFE] p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {editingId === task.id ? (
                    <div className="grid gap-4">
                      <input
                        value={editMataKuliah}
                        onChange={(e) =>
                          setEditMataKuliah(e.target.value)
                        }
                        className="rounded-xl border border-pink-200 p-3"
                        placeholder="Mata Kuliah"
                      />

                      <input
                        value={editNamaTugas}
                        onChange={(e) =>
                          setEditNamaTugas(e.target.value)
                        }
                        className="rounded-xl border border-pink-200 p-3"
                        placeholder="Nama Tugas"
                      />

                      <input
                        type="date"
                        value={editDeadline}
                        onChange={(e) =>
                          setEditDeadline(e.target.value)
                        }
                        className="rounded-xl border border-pink-200 p-3"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center gap-2">
                        <BookOpen
                          size={22}
                          className="text-pink-500"
                        />

                        <h3 className="text-xl font-bold text-pink-600">
                          {task.mata_kuliah}
                        </h3>
                      </div>

                      <h2
                        className={`text-2xl font-bold ${
                          task.is_completed
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {task.nama_tugas}
                      </h2>

                      <div className="mt-4 flex items-center gap-2 text-gray-500">
                        <CalendarDays size={18} />
                        Deadline : {task.deadline || "-"}
                      </div>

                      <div className="mt-3">
                        {task.is_completed ? (
                          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                            ✅ Completed
                          </span>
                        ) : (
                          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                            ⏳ Pending
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                                        <button
                      onClick={() =>
                        toggleComplete(
                          task.id,
                          task.is_completed
                        )
                      }
                      className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition hover:scale-105 ${
                        task.is_completed
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      <CheckCircle2 size={18} />
                      {task.is_completed
                        ? "Batalkan"
                        : "Selesai"}
                    </button>

                    {editingId === task.id ? (
                      <button
                        onClick={() =>
                          handleUpdate(task.id)
                        }
                        className="rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:scale-105"
                      >
                        Simpan
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(task.id);
                          setEditMataKuliah(task.mata_kuliah);
                          setEditNamaTugas(task.nama_tugas);
                          setEditDeadline(task.deadline ?? "");
                        }}
                        className="flex items-center gap-2 rounded-xl bg-[#A7DEF8] px-5 py-3 font-semibold text-white transition hover:scale-105"
                      >
                        <Pencil size={18} />
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(task.id)
                      }
                      className="flex items-center gap-2 rounded-xl bg-[#F7B4CF] px-5 py-3 font-semibold text-white transition hover:scale-105"
                    >
                      <Trash2 size={18} />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow-md">
            <Sparkles
              size={18}
              className="text-pink-500"
            />

            <p className="text-sm font-medium text-gray-500">
              Student Task Planner • Next.js • Supabase
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed -left-24 top-32 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 right-0 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
    </main>
  );
}