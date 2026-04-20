const tones = {
  ink:    { bg: '#2A1F2E', color: '#F4EDE1' },
  coral:  { bg: 'rgba(255,122,92,0.22)', color: '#FF7A5C' },
  amber:  { bg: 'rgba(244,185,66,0.22)', color: '#F4B942' },
  mint:   { bg: 'rgba(127,212,193,0.22)', color: '#7FD4C1' },
  violet: { bg: 'rgba(155,127,212,0.22)', color: '#9B7FD4' },
  paper:  { bg: '#E4D7BF', color: '#2A1F2E' },
};

export default function Chip({ children, tone = 'paper', size = 'default', style }) {
  const { bg, color } = tones[tone] || tones.paper;
  const isSmall = size === 'sm';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: bg,
      color,
      fontFamily: 'var(--font-mono)',
      fontSize: isSmall ? '10px' : '11px',
      fontWeight: 600,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      padding: isSmall ? '4px 9px' : '6px 11px',
      borderRadius: '99px',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {children}
    </span>
  );
}
