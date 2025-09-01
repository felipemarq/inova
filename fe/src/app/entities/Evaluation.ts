export interface Evaluation {
  id: string;
  createdAt: string;
  comments: string;
  evaluatorId: string;
  criteria: Criteria[];
  evaluator: {
    name: string;
  };
}

export interface Criteria {
  id: string;
  name: string;
  score: number;
}
