import { Ticket } from "lucide-react";

export default function Logo() {
  return (
    <div className="font-bold flex items-center gap-2 px-2 py-1">
      <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
        <Ticket className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-extrabold gradient-text tracking-tight">EventConnect</span>
    </div>
  );
}

