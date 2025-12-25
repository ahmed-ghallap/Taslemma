import { Plus } from "lucide-react";

export default function PlusButton({ className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-100 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-primary-100 grid h-[6cqi] w-[7cqi] cursor-pointer place-items-center rounded-[1.2cqi] border-[.3cqi] transition-colors duration-100 *:scale-90 ${className}`}
    >
      <Plus className="aspect-square h-full w-full stroke-[.4cqi] p-[1cqi]" />
    </button>
  );
}
