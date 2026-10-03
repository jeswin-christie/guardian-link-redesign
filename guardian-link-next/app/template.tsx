/** Re-mounts on every navigation: a navy curtain lifts off the new page. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden="true" />
      {children}
    </>
  );
}
