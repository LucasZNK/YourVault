import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import GradientText from "./GradientText";

function App() {
  const [output, setOutput] = useState<{
    privateKey: string;
    mnemonic: string;
  }>({ privateKey: "", mnemonic: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [keyboard, setKeyboard] = useState<number[]>([]);

  const [gradientIndex, setGradientIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 8000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function generateKeys() {
    if (validateFields()) {
      const response = await invoke<string[]>("generate_values", {
        username: username.trim(),
        password: password.trim(),
        pin,
      });
      setOutput({ privateKey: response[0], mnemonic: response[1] });
    } else {
      alert("Please fill in all fields.");
    }
  }

  function validateFields() {
    return (
      username.trim().length > 0 && password.trim().length > 0 && pin.length > 0
    );
  }

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

  useEffect(() => {
    shuffleKeyboard();
  }, []);

  function shuffleKeyboard() {
    const numbers = Array.from({ length: 10 }, (_, i) => i);
    numbers.sort(() => Math.random() - 0.5);
    setKeyboard(numbers);
  }

  function handleKeyClick(number: number) {
    setPin((prevPin) => prevPin + number.toString());
    shuffleKeyboard();
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  function cleanFields() {
    setUsername("");
    setPassword("");
    setPin("");
    setOutput({ privateKey: "", mnemonic: "" });
    setShowPrivateKey(false);
    setShowMnemonic(false);
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Welcome to YourVault</h1>
        <GradientText />

        <div className="form-container">
          <div className="form-container">
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                generateKeys();
              }}
              onKeyDown={handleKeyPress}
            >
              <div className="input-container">
                <label className="label" htmlFor="username-input">
                  Username:
                </label>
                <input
                  className="input"
                  id="username-input"
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  placeholder="Enter username..."
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="password-input">
                  Password:
                </label>
                <input
                  className="input"
                  id="password-input"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Enter password..."
                  type="password"
                />
              </div>

              <div className="input-container keyboard-container">
                <label className="label" htmlFor="pin-input">
                  PIN:
                </label>
                <input id="pin-input" value={pin} readOnly />
              </div>
              <div className="keyboard">
                <div className="keyboard-row">
                  {keyboard.slice(0, 3).map((number) => (
                    <button
                      key={number}
                      className="keyboard-button"
                      onClick={() => handleKeyClick(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <div className="keyboard-row">
                  {keyboard.slice(3, 6).map((number) => (
                    <button
                      key={number}
                      className="keyboard-button"
                      onClick={() => handleKeyClick(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <div className="keyboard-row">
                  {keyboard.slice(6, 10).map((number) => (
                    <button
                      key={number}
                      className="keyboard-button"
                      onClick={() => handleKeyClick(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button>Generate</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
