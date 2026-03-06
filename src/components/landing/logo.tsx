export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="4.5" fill="currentColor" />
      <circle cx="16" cy="7.2" r="3" fill="currentColor" />
      <circle cx="23.6" cy="11.6" r="3" fill="currentColor" />
      <circle cx="23.6" cy="20.4" r="3" fill="currentColor" />
      <circle cx="16" cy="24.8" r="3" fill="currentColor" />
      <circle cx="8.4" cy="20.4" r="3" fill="currentColor" />
      <circle cx="8.4" cy="11.6" r="3" fill="currentColor" />
    </svg>
  );
}
