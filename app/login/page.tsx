interface LoginPageProps {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/";

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#1a2332" }}>
      <div className="w-full max-w-sm rounded-lg p-6" style={{ backgroundColor: "#243044", border: "1px solid #2d3d54" }}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #c9a84c, #e0c070)", color: "#0f1825" }}
          >
            J
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight" style={{ color: "#ffffff" }}>
              BBG Course Library
            </h1>
            <p className="text-xs" style={{ color: "#94a3b8" }}>
              Private access
            </p>
          </div>
        </div>

        <form action="/api/login" method="post" className="space-y-4">
          <input type="hidden" name="next" value={nextPath} />
          <label className="block">
            <span className="block text-sm font-medium mb-2" style={{ color: "#e2e8f0" }}>
              Password
            </span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              className="w-full rounded-md px-3 py-2 outline-none"
              style={{ backgroundColor: "#1a2332", border: "1px solid #2d3d54", color: "#ffffff" }}
            />
          </label>
          {params.error && (
            <p className="text-sm" style={{ color: "#fca5a5" }}>
              Wrong password.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-md px-4 py-2 font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c9a84c", color: "#0f1825" }}
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}
