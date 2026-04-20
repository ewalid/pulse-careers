export default function NeonBlob({ color, size = 400, top, right, bottom, left, opacity = 0.35, blur = 8, mixBlend }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
        top,
        right,
        bottom,
        left,
        pointerEvents: 'none',
        mixBlendMode: mixBlend,
      }}
    />
  );
}
