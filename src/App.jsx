import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numAllow, setnumAllow] = useState(false);
  const [symAllow, setsymAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const PasswordGen = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let sym = "!@#$%^&*()_+{}|:<>?[];',./";
    let pass = "";

    if (numAllow) str += num;
    if (symAllow) str += sym;

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numAllow, symAllow, setPassword]);

  const CopytoClip = useCallback(() => {
    passRef.current?.select(); // For Giving a Selection Effect to the User
    passRef.current?.setSelectionRange(0, length + 1); // For giving a Selection Range
    window.navigator.clipboard.writeText(password); // This method must not use in NEXT.js beacuse there are no any type of Window in SERVER (Server Side Rendering)
  }, [password]);

  useEffect(() => {
    PasswordGen();
  }, [length, numAllow, symAllow, PasswordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto h-screen text-white ">
        <h1 className="text-4xl text-center p-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3 text-black font-semibold"
            placeholder="Password"
            value={password}
            ref={passRef}
            readOnly
          />
          <button className="bg-blue-700 px-2 py-3" onClick={CopytoClip}>
            {" "}
            Copy{" "}
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>Length: {length} </label>
          </div>

          <div className="flex items-center gap-x-1">
            <label htmlFor="num">Numbers</label>
            <input
              type="checkbox"
              id="num"
              onChange={() => {
                setnumAllow((e) => !e);
              }}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <label htmlFor="char">Character</label>
            <input
              type="checkbox"
              id="char"
              onChange={() => {
                setsymAllow((e) => !e);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
