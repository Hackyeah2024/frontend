import Link from "next/link";

export const Header = ({}) => {
  return (
    <header className="p-4 bg-background border-b">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold text-primary">Logo</div>
          </Link>
          <nav>
            <ul>
              <li>
                <Link
                  href="/videos"
                  className="text-primary hover:text-primary/80"
                >
                  Your videos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
