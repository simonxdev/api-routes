import { useRef, useState } from "react";

function HomePage() {

  const [feedbackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
    .then((response) => response.json())
    .then((data) => {
        setFeedbackItems(data.feedback);
    });
  }

  return (
    <div>
      <div>
        <h1>The Home Page</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your EMail Adress</label>
          <input type="email" id="email" name="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="5"
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
      {feedbackItems.map(item => 
        <li key={item.id}>{item.email} {item.text}</li>
      )}
      </ul>
    </div>
  );
}

export default HomePage;
