export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
