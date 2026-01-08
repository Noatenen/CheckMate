import { useState } from "react";

function LinkCheckerTab() {
  var [url, setUrl] = useState("");
  var [result, setResult] = useState(null);
  var [loading, setLoading] = useState(false);
  var [error, setError] = useState("");

  async function handleClick() {
    setResult(null);
    setLoading(true);
    setError("");

    try {
      var res = await fetch("http://localhost:4000/api/link/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      });

      var data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>בדיקת לינקים</h2>

      <input
        type="text"
        placeholder="הדביקי לינק כאן"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button onClick={handleClick} disabled={!url || loading} style={{ marginTop: "10px" }}>
        {loading ? "בודקות..." : "בדיקה"}
      </button>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      {result ? (
        <div style={{ marginTop: "16px" }}>
          <h3>Verdict: {result.verdict}</h3>
          <p>
            <strong>Score (1-5):</strong> {result.score}
          </p>

          {Array.isArray(result.reasons) ? (
            <ul>
              {result.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          ) : null}

          <p>
            <strong>Recommendation:</strong> {result.recommendation}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default LinkCheckerTab;
