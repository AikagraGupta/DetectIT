export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-50">
      <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-pulse" />
    </div>
  );
}
