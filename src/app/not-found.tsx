import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Página não encontrada</h2>
      <Link href="/login">Volte para a Home</Link>
    </div>
  );
}
