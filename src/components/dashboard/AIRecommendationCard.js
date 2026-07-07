import { getAdvice } from "../../utils/taskUtils";

export default function AIRecommendationCard({ tasks }) {
  return (
    <article className="card">
      <h2>AI Recommendation</h2>
      <p className="recommendation-text">{getAdvice(tasks)}</p>
    </article>
  );
}
