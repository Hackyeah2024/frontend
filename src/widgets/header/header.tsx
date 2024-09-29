import Image from "next/image";
import Link from "next/link";

export const Header = ({}) => {
  return (
    <header className="p-4 bg-background border-b">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="SpeechFlow"
              width={256}
              height={36}
              className="w-64 h-9"
            />
          </Link>
          <nav>
            <ul>
              <li>
                <Link
                  href="/videos"
                  className="text-primary hover:text-primary/80"
                >
                  Twoje wideo
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
