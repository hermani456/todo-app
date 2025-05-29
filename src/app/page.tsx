"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function UserProfile() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex items-center gap-4">
      {user && (
        <>
          <span className="text-sm">Hi, {user.firstName || user.username}!</span>
          <UserButton afterSignOutUrl="/sign-in" />
        </>
      )}
    </div>
  );
}