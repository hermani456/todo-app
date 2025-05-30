import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export async function NavBar() {
  const user = await currentUser();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <span className="text-lg font-bold">
        Welcome {user ? user.firstName : "Guest"}!
      </span>
      <div className="flex items-center">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
      </div>
    </nav>
  );
}
