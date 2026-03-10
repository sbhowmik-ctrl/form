"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  bloodGrp: string;
  phone: string;
  idNumber: string;
  department: string;
};

export default function HomePage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    bloodGrp: "",
    phone: "",
    idNumber: "",
    department: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    console.log("submitting form", form);

    try {
      const res = await fetch("/api/person", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Registered successfully");

        // attempt to send a confirmation email
        try {
          await fetch("/api/person/send_mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: form.email,
              subject: "Registration complete",
              text: `Thank you for registering your blood group (${form.bloodGrp}).`,
            }),
          });
        } catch (err) {
          console.error("mail send failed", err);
        }

        setForm({
          name: "",
          email: "",
          bloodGrp: "",
          phone: "",
          idNumber: "",
          department: "",
        });
      } else {
        const data = await res.json();
        setStatus(data?.error || "Failed to save");
      }
    } catch {
      setStatus("Network error");
    }
  }

  return (
    <main className="flex items-center justify-center p-5 font-sans antialiased min-h-screen relative overflow-hidden">

      {/* Background Glows */}
      <div className="fixed -z-10 top-[-15%] left-[-15%] w-[120%] h-[50%] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -z-10 bottom-[10%] right-[-10%] w-72 h-72 bg-white/40 dark:bg-slate-800/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[420px] z-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Emergency Registry
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Secure blood group database.
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-[3rem] p-8 shadow-lg relative">
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              type="text"
              placeholder="Full Name"
              className="w-full rounded-2xl px-4 py-3 border focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl px-4 py-3 border focus:ring-2 focus:ring-blue-500"
            />

            {/* Blood Group */}
            <div>
              <p className="text-sm font-semibold mb-2">Blood Group</p>
              <div className="grid grid-cols-4 gap-2">
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((grp) => (
                  <label key={grp} className="cursor-pointer">
                    <input
                      type="radio"
                      name="bloodGrp"
                      value={grp}
                      checked={form.bloodGrp === grp}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          bloodGrp: e.target.value,
                        }))
                      }
                      className="hidden"
                      required
                    />
                    <div
                      className={`py-2 rounded-xl text-center font-bold border transition-all
                        ${
                          form.bloodGrp === grp
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "bg-white text-slate-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                      {grp}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Phone */}
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone"
              className="w-full rounded-2xl px-4 py-3 border focus:ring-2 focus:ring-blue-500"
            />

            {/* ID */}
            <input
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              type="text"
              placeholder="ID Number"
              className="w-full rounded-2xl px-4 py-3 border focus:ring-2 focus:ring-blue-500"
            />

            {/* Department */}
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              type="text"
              placeholder="Department"
              className="w-full rounded-2xl px-4 py-3 border focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3 rounded-2xl transition-all"
            >
              Register
            </button>

            {status && (
              <p className="text-center text-sm mt-2">{status}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}