const Topbar = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Admin</span>
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white
                        flex items-center justify-center text-sm font-bold">
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;
