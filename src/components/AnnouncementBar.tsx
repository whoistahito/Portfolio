import { Link } from "react-router-dom";

export const AnnouncementBar = () => {
  return (
    <div className="hidden w-full bg-white text-black text-center py-1 font-medium text-sm tracking-wide border-b border-gray-200 z-50 uppercase">
      <Link to="/updates" className="hover:underline block w-full h-full">
        Kalender 2026 ist da!
      </Link>
    </div>
  );
};

