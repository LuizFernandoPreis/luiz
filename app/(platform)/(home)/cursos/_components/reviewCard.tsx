import { Key } from "lucide-react";
import { Review } from "../types/reviewType";

export default function ReviewCard({ review, id }: { review: Review, id: number }) {
  return (
    <div className="w-full md:w-1/2 lg:w-[31%] rounded-lg overflow-hidden shadow-lg bg-white p-6 flex items-center space-x-6 mb-6">
      <div className="flex-shrink-0">
        <img
          className="h-16 w-16 rounded-full"
          src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
          alt={review.user.display_name}
        />
      </div>
      <div className="flex-1 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4 w-full">
          <div>
            <p className="text-lg font-semibold text-gray-800">{review.user.display_name}</p>
            <p className="text-sm text-gray-600">
              Publicado em: {new Date(review.created).toLocaleDateString()}
            </p>
          </div>

          <div className="items-center hidden md:block">
            <span className="flex text-yellow-400">
              {Array.from({ length: review.rating }).map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6l2.35 7.03h7.18l-5.81 4.22 2.2 7.16-5.82-4.24-5.82 4.24 2.2-7.16-5.81-4.22h7.18z"
                  />
                </svg>
              ))}
            </span>
            <p className="ml-2 text-gray-600">Avaliação: {review.rating}/5</p>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4">
          {review.content || "Sem comentário."}
        </p>
        <div className="text-sm text-gray-600">
          <p>Última modificação: {new Date(review.modified).toLocaleDateString()}</p>
        </div>

        <div className="items-center block md:hidden">
            <span className="flex text-yellow-400">
              {Array.from({ length: review.rating }).map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6l2.35 7.03h7.18l-5.81 4.22 2.2 7.16-5.82-4.24-5.82 4.24 2.2-7.16-5.81-4.22h7.18z"
                  />
                </svg>
              ))}
            </span>
            <p className="ml-2 text-gray-600">Avaliação: {review.rating}/5</p>
          </div>
      </div>
    </div>
  );
}
