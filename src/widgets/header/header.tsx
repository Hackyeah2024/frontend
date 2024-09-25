import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = ({}) => {
  return (
    <header className="p-4">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between gap-4 md:gap-3">
          <Link href="/">Logo</Link>
          <div>
            <SignedOut>
              <Link href="/sign-in">Sign in</Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};
