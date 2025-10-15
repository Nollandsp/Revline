export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`bg-neutral-800 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-red-500 outline-none resize-none ${className}`}
    />
  );
}
