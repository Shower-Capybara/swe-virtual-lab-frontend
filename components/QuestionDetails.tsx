import { Question } from "@/types";
import { Pie } from "react-chartjs-2";

interface QuestionDetailsPopupProps {
  question: Question;
  onClose: () => void;
}

const QuestionDetailsPopup: React.FC<QuestionDetailsPopupProps> = ({
  question,
  onClose,
}) => {
  const data = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        data: [
          question.correct_answers,
          question.total_answers - question.correct_answers,
        ],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#e57373"],
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-2xl rounded-lg p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {question.title}
        </h2>

        {/* Image */}
        {question.image && (
          <img
            src={question.image}
            alt={question.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}

        {/* Description */}
        <p className="text-gray-700 mb-4">{question.description}</p>

        {/* Created At */}
        <p className="text-sm text-gray-500 mb-4">
          Created on: {new Date(question.created_at).toLocaleDateString()}
        </p>

        {/* Chart */}
        <div className="w-full max-w-md mx-auto mb-6">
          <Pie data={data} />
        </div>

        {/* Metrics */}
        <div className="flex justify-between text-gray-700">
          <div>
            <p className="font-semibold">Total Answers</p>
            <p>{question.total_answers}</p>
          </div>
          <div>
            <p className="font-semibold">Correct Answers</p>
            <p>{question.correct_answers}</p>
          </div>
          <div>
            <p className="font-semibold">Avg Time Spent</p>
            <p>{question.avg_time_spent_sec} sec</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailsPopup;
