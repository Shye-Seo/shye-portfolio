type AccentProps = {
  text: string;
  accent: string;
};

/** 한 줄 안에서 마지막으로 나오는 강조어만 포인트 색(딥 앰버)으로 표시합니다. */
export function Accent({ text, accent }: AccentProps) {
  const i = text.lastIndexOf(accent);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em className="accent">{accent}</em>
      {text.slice(i + accent.length)}
    </>
  );
}
