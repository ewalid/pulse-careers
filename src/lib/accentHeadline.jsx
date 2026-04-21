export function accentHeadline(text, accentWord) {
  if (!accentWord || !text) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(accentWord.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <em style={{ fontStyle: 'italic', color: '#FF7A5C', WebkitTextFillColor: '#FF7A5C' }}>
        {text.slice(idx, idx + accentWord.length)}
      </em>
      {text.slice(idx + accentWord.length)}
    </>
  );
}
