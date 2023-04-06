import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import GradientText from "./GradientText";

interface Keys {
  privateKey: string;
  mnemonic: string;
}
function App() {
  const [output, setOutput] = useState<Keys>({
    privateKey: "",
    mnemonic: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [keyboard, setKeyboard] = useState<number[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);

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
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onKeyDown={handleKeyPress}
          >
            <label className="label" htmlFor="username-input">
              Username:
            </label>
            <div className="input-container">
              <input
                className="input"
                id="username-input"
                value={username}
                onChange={(e) =>
                  setUsername(e.currentTarget.value.toLowerCase())
                }
                placeholder="Enter username..."
              />
            </div>
            <label className="label" htmlFor="password-input">
              Password:
            </label>
            <div className="input-container">
              <input
                className="input"
                id="password-input"
                value={password}
                onChange={(e) =>
                  setPassword(e.currentTarget.value.toLowerCase())
                }
                placeholder="Enter password..."
                type={showPin ? "text" : "password"} // mostrar/ocultar pin
              />
            </div>
            <label className="label" htmlFor="pin-input">
              PIN
            </label>
            <input
              id="pin-input"
              value={pin}
              readOnly
              type={showPin ? "text" : "password"} // mostrar/ocultar pin
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)} // alternar estado
            >
              {showPin ? "Hide" : "Show"}
            </button>

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
              <button type="button" onClick={generateKeys}>
                Generate
              </button>
            </div>
          </form>
          <div className="output-row">
            <label htmlFor="private-key">Private Key:</label>
            <input
              id="private-key"
              value={
                showPrivateKey
                  ? output.privateKey
                  : "•".repeat(output.privateKey.length)
              }
              readOnly
            />
            <div className="button-container">
              <button onClick={() => setShowPrivateKey(!showPrivateKey)}>
                {showPrivateKey ? "Hide" : "Show"}
              </button>
              <button onClick={() => copyToClipboard(output.privateKey)}>
                Copy
              </button>
            </div>

            <div className="output-row">
              <label htmlFor="mnemonic">Mnemonic Phrase:</label>
              <input
                id="mnemonic"
                value={
                  showMnemonic
                    ? output.mnemonic
                    : "•".repeat(output.mnemonic.length)
                }
                readOnly
              />
            </div>
            <div className="button-container">
              <button onClick={() => setShowMnemonic(!showMnemonic)}>
                {showMnemonic ? "Hide" : "Show"}
              </button>
              <button onClick={() => copyToClipboard(output.mnemonic)}>
                Copy
              </button>
              <div>
                <button onClick={cleanFields}>Clean</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
