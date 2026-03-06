export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-canvas-bg flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
