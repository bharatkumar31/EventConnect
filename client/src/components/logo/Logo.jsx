import { Ticket } from "lucide-react";

export default function Logo() {
  return (
    <div className="font-bold flex items-center gap-2 p-4">
      <Ticket className="w-9 h-9 text-indigo-600" />
      <span className="text-2xl text-slate-800">EventConnect</span>
    </div>
  );
}
