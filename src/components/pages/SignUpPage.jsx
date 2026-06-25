import {
  SignedOut,
} from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignedOut />
    </div>
  );
}