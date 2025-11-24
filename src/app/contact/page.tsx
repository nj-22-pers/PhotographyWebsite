// "use client";

// import { useState } from "react";

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);

//   async function handleSubmit(e: any) {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch("/api/contact", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });

//     setLoading(false);

//     if (res.ok) {
//       setSent(true);
//       setForm({ name: "", email: "", message: "" });
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto py-20 px-6">
//       <h1 className="text-4xl font-bold mb-6">Contact Me</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">

//         <div>
//           <label className="block mb-2 font-medium">Name</label>
//           <input
//             type="text"
//             required
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="w-full border border-gray-300 rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">Email</label>
//           <input
//             type="email"
//             required
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full border border-gray-300 rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">Message</label>
//           <textarea
//             required
//             value={form.message}
//             onChange={(e) => setForm({ ...form, message: e.target.value })}
//             className="w-full border border-gray-300 rounded-lg p-3 h-32"
//           ></textarea>
//         </div>

//         <button
//           disabled={loading}
//           className="bg-black text-white py-3 px-6 rounded-lg w-full"
//         >
//           {loading ? "Sending..." : "Send Message"}
//         </button>

//         {sent && (
//           <p className="text-green-600 font-medium mt-4">
//             Message sent successfully!
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
