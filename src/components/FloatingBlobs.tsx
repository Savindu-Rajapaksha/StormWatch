export default function FloatingBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(76, 201, 240, 0.4) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/2 right-20 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-float-delayed"
        style={{
          background: 'radial-gradient(circle, rgba(72, 149, 239, 0.3) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-32 left-1/3 w-80 h-80 rounded-full opacity-10 blur-3xl animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(76, 201, 240, 0.5) 0%, transparent 70%)',
          animationDelay: '1s',
        }}
      />
    </div>
  );
}
