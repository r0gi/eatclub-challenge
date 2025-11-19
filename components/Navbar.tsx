import Link from "next/link";
import { SlidersHorizontalIcon, UserIcon } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <Link href="/profile" aria-label="Profile">
        <UserIcon className="w-6 h-6" />
      </Link>

      <Link href="/" aria-label="Home">
        <Image src="/eatclub_logo.png" width={6} height={6} className="w-6 h-6" alt="EatClub logo" />
      </Link>

      <Link href="/" aria-label="Filters">
        <SlidersHorizontalIcon className="w-6 h-6" />
      </Link>
    </nav>
  );
}
