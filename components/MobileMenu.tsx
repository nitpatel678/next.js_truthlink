import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const links = [
    { href: "/submit-report", label: "Submit Report" },
    { href: "/track-report", label: "Track Report" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Menu content */}
      <div
        className="fixed right-0 top-0 h-full w-64 bg-zinc-900 p-6 shadow-xl 
                   animate-slideIn flex flex-col justify-between"
      >
        <div>
          {/* Close button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Nav */}
          <nav className="flex flex-col space-y-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  pathname === href
                    ? "text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={onClose}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-4 text-xs text-zinc-500">
          <p className="mb-1">TruthLink © {new Date().getFullYear()}</p>
          <p className="text-teal-600">Anonymous. Secure. Trusted.</p>
        </div>
      </div>
    </div>
  );
}
