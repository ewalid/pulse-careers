export default function PulseLogo({ size = 20, color }) {
  // color prop controls circle stroke + wordmark; pulse path is always coral
  const fg = color || '#2A1F2E';
  // Scale everything from the original 88×22 viewBox / 15px text size
  const scale = size / 22;
  const w = Math.round(88 * scale);
  const h = Math.round(22 * scale);

  return (
    <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', lineHeight: 0 }}>
      <svg width={w} height={h} viewBox="0 0 88 22" fill="none">
        <circle cx="10" cy="11" r="9" stroke={fg} strokeWidth="2.2" />
        <path
          d="M5 11 L8 11 L10 6 L12 16 L14 11 L17 11"
          stroke="#FF7A5C"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <text
          x="24" y="16"
          fill={fg}
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="700"
          fontSize="15"
          letterSpacing="0.5"
        >
          PULSE
        </text>
      </svg>
    </a>
  );
}
