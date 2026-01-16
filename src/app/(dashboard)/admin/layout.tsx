import AdminLayoutShell from "@/components/layout/admin/AdminLayoutShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}