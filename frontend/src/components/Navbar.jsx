const Navbar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">
          MERN Todo
        </h1>

        <span className="text-sm text-slate-500">
          Stay organized
        </span>
      </div>
    </nav>
  )
}

export default Navbar
