import { useState } from "react";
import "./App.css";
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import useTypingAnimation from "./useTypingAnimation";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    setTimeout(async () => {
      const ai = await requestToGroqAI(
        document.getElementById("content").value,
      );
      setData(ai);
      setLoading(false);
    }, 2000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const displayedText = useTypingAnimation(data, 50);

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto">
      <h1 className="text-4xl text-indigo-500">PAN.AI | ReactJS</h1>
      <form className="flex flex-col gap-4 py-4 w-full">
        <input
          placeholder="Ketik Pesan Disini..."
          className="py-2 px-4 text-md rounded-md"
          id="content"
          type="text"
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md"
          onClick={handleSubmit}
          type="button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Kirim"}
        </button>
      </form>
      <div className="max-w-xl w-full mx-auto">
        {data ? (
          <div className="syntax-container">
            <SyntaxHighlight
              language="swift"
              style={darcula}
              wrapLongLines={true}
            >
              {displayedText}
            </SyntaxHighlight>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
