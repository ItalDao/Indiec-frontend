export default function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="section-title" style={{ 
      fontSize: '2rem', 
      fontWeight: 'bold', 
      marginBottom: '2rem',
      color: '#1e293b'
    }}>
      {title}
    </h2>
  );
}

