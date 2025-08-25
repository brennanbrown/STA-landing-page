import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-semibold">STA</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/(protected)/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/(protected)/integrations" className="hover:underline">Integrations</Link>
          <Link href="/(protected)/settings" className="hover:underline">Settings</Link>
        </div>
      </nav>
    </header>
  )
}
