import type { PropsWithChildren, ReactNode } from "react";
import { Brain, BookOpenCheck, RectangleEllipsis, FolderCode } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "Tailored Diplomas",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    icon: BookOpenCheck,
    title: "Focused Exams",
    description:
      "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    icon: RectangleEllipsis,
    title: "Smart Multi-Step Forms",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
];

interface AuthLayoutProps extends PropsWithChildren {
  header?: ReactNode;
  footer?: ReactNode;
}

export default function AuthLayout({ children, header, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex font-mono">
      {/* Left panel — identical across all auth screens */}
      <div
        className="hidden md:flex md:w-1/2 flex-col justify-center px-16 lg:px-24"
        style={{
          background:
            "linear-gradient(160deg, #dbeafe 0%, #eef2ff 45%, #ffffff 100%)",
        }}
      >
        <div className="flex items-center gap-2 mb-16 ">
          <FolderCode className="w-5 h-5 text-blue-600 " strokeWidth={2.5} />
          <span className="text-blue-600 font-semibold tracking-tight">
            Exam App
          </span>
        </div>

        <h1 className="text-3xl lg:text-[2rem] font-bold text-slate-900 leading-snug mb-12 max-w-md">
          Empower your learning journey with our smart exam platform.
        </h1>

        <div className="flex flex-col gap-8">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 max-w-sm">
              <div className="shrink-0 w-9 h-9 rounded-lg border border-blue-200 bg-white/60 flex items-center justify-center">
                <Icon className="w-4 h-4 text-blue-600" strokeWidth={2} />
              </div>
              <div>
                <p className="text-blue-600 font-semibold text-sm mb-1">
                  {title}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — the changing part (login form, register step, etc.) */}
      <div className="flex-1 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm">
          {header && <div>{header}</div>}
          {children}
          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}