"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setError(
          data?.error || "Unable to send message right now. Please try again."
        );
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6 md:px-8 md:pt-32">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-10">
          <div className="mb-8 space-y-2 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
              Contact
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">Let’s connect.</h1>
            <p className="text-white/70">
              Whether you’re interested in purchasing a print, commissioning a shoot, or just have a question, feel free to reach out — I’d love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-white/80">
                <span>Name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-black/40 p-3 text-white placeholder-white/50 outline-none transition focus:border-white/40 focus:bg-black/60"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-white/80">
                <span>Email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-black/40 p-3 text-white placeholder-white/50 outline-none transition focus:border-white/40 focus:bg-black/60"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-white/80">
              <span>Message</span>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="min-h-[160px] w-full rounded-lg border border-white/15 bg-black/40 p-3 text-white placeholder-white/50 outline-none transition focus:border-white/40 focus:bg-black/60"
              ></textarea>
            </label>

            <button
              disabled={status === "sending"}
              className="w-full rounded-lg bg-white px-5 py-3 text-black font-semibold transition hover:bg-white/90 disabled:opacity-70"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-400 font-medium">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 font-medium">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
