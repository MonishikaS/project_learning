export default function ResultModal({ correct, explanation, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>{correct ? "✅ Correct!" : "❌ Incorrect!"}</h3>
        <p>{explanation}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
