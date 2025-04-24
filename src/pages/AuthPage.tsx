import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const [mode, setMode] = useState<"login" | "register">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from || "/";

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const url =
      mode === "login"
        ? "http://authtest.duckdns.org/api/auth/login"
        : "http://authtest.duckdns.org/api/auth/register";

    const payload =
      mode === "login"
        ? { email: loginEmail, password: loginPassword }
        : {
            username: registerName,
            email: registerEmail,
            password: registerPassword,
          };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (response.status === 409) {
        setError("Email already exists");
        return;
      }
      
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess(mode === "login" ? "Login successful!" : "Account created!");
        // Use the token and username from the response
        login(data.token, mode === "login" ? data.username : registerName);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          {mode === "login" ? "Login to your account" : "Create a new account"}
        </h1>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded-l font-medium ${
              mode === "login" ? "bg-red-600" : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`px-4 py-2 rounded-r font-medium ${
              mode === "register"
                ? "bg-red-600"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 border border-gray-600"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 border border-gray-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </>
        )}

        {mode === "login" && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 border border-gray-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </>
        )}

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium disabled:opacity-50"
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
