interface KeyQuestionsProps {
  questions: string[];
}

export const KeyQuestions = ({ questions }: KeyQuestionsProps) => {
  return (
    <ol className="list-decimal py-4 pb-0 pl-8 pr-4 rounded-md border border-slate-100 max-h-80 overflow-y-auto">
      {questions.map((question) => (
        <li className="mb-4" key={question}>
          {question}
        </li>
      ))}
    </ol>
  );
};
