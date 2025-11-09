import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <section className="welcome-section">
        <h1>Welcome!</h1>
        <p>Ready to test your knowledge? Let's begin your personalized adaptive learning journey.</p>
      </section>

      <section className="assessment-section">
        <h2>Assessment Modes</h2>
        <p>Choose your assessment type: Diagnostic (baseline), Formative (practice), or Summative (checkpoint)</p>

        <div className="cards">
          <div className="card diagnostic">
            <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="Diagnostic" />
            <h3>Diagnostic</h3>
            <p>Assess current knowledge level</p>
          </div>

          <div className="card formative">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Formative" />
            <h3>Formative</h3>
            <p>Practice and improve</p>
          </div>

          <div className="card summative">
            <img src="https://cdn-icons-png.flaticon.com/512/3314/3314190.png" alt="Summative" />
            <h3>Summative</h3>
            <p>Final assessment</p>
          </div>
        </div>
      </section>
    </>
  );
}
