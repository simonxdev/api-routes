import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../pages/api/feedback";

function FeedbackPage(props) {
  const [feedbackDetails, setFeedbackDetails] = useState();
  function loadFeedbackDetails(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackDetails(data.feedback);
      });
  }
  return (
    <Fragment>
    {feedbackDetails && <p>{feedbackDetails.email}</p>}
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick={loadFeedbackDetails.bind(null, item.id)}>
            Show Details
          </button>
        </li>
      ))}
    </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
