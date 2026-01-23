import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <SignIn />
    </div>
  );
}
