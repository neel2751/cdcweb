
export default function TextRoll({ children }: { children: string }) {
  return (
    <span className="text-roll">
      <span>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}