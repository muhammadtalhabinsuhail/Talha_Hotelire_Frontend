"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faReply,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { OwnerLayout } from "@/components/owner/OwnerLayout";

interface Review {
  id: number;
  guestName: string;
  guestAvatar: string;
  property: string;
  date: string;
  rating: number;
  text: string;
  reply?: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    guestName: "John Smith",
    guestAvatar: "JS",
    property: "Luxury King Suite",
    date: "2024-01-15",
    rating: 5,
    text: "Absolutely stunning property! The views were breathtaking and the amenities exceeded all expectations. The staff was incredibly accommodating and made our anniversary celebration truly special. Will definitely be returning!",
    reply: "Thank you so much for your kind words, John! We're thrilled you enjoyed your anniversary celebration with us. We look forward to welcoming you back soon!",
  },
  {
    id: 2,
    guestName: "Sarah Johnson",
    guestAvatar: "SJ",
    property: "Oceanview Deluxe Room",
    date: "2024-01-12",
    rating: 4,
    text: "Great location and beautiful ocean views. The room was clean and comfortable. Only minor issue was the AC took a while to cool down the room, but otherwise a fantastic stay.",
  },
  {
    id: 3,
    guestName: "Michael Brown",
    guestAvatar: "MB",
    property: "Downtown Studio",
    date: "2024-01-10",
    rating: 5,
    text: "Perfect for a business trip! Walking distance to everything I needed. The studio was modern, well-equipped, and the WiFi was super fast. Highly recommend for solo travelers or couples.",
  },
  {
    id: 4,
    guestName: "Emily Davis",
    guestAvatar: "ED",
    property: "Mountain Retreat Cabin",
    date: "2024-01-08",
    rating: 3,
    text: "The cabin itself is charming and the mountain views are incredible. However, the road to get there was quite challenging and not well marked. Also, the heating system could use an upgrade for winter stays.",
  },
  {
    id: 5,
    guestName: "David Wilson",
    guestAvatar: "DW",
    property: "Cozy Garden Suite",
    date: "2024-01-05",
    rating: 5,
    text: "What a hidden gem! The garden is absolutely beautiful and so peaceful. Perfect getaway from the city. The hosts left fresh fruits and snacks which was a lovely touch. Can't wait to come back in spring!",
    reply: "Thank you David! We're so glad you loved the garden. Spring is indeed magical here - we'd love to have you back!",
  },
  {
    id: 6,
    guestName: "Jessica Taylor",
    guestAvatar: "JT",
    property: "Penthouse Paradise",
    date: "2024-01-02",
    rating: 5,
    text: "Wow! This penthouse is incredible. The 360-degree city views, the jacuzzi on the balcony, the marble bathroom - everything was absolutely luxurious. Worth every penny!",
  },
];

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={star <= rating ? faStar : faStarEmpty}
          className={`${sizeClass} ${star <= rating ? "text-[#FEBC11]" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(reviewsData);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (r) => reviews.filter((review) => review.rating === r).length
  );

  const handleSubmitReply = (reviewId: number) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, reply: replyText } : r))
    );
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Reviews
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage guest reviews and feedback
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span
                  className="text-5xl font-bold text-gray-800 dark:text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {averageRating}
                </span>
                <FontAwesomeIcon icon={faStar} className="w-8 h-8 text-[#FEBC11]" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Based on {reviews.length} reviews
              </p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-6">{rating}</span>
                  <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-[#FEBC11]" />
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FEBC11] rounded-full transition-all"
                      style={{ width: `${(ratingCounts[index] / reviews.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                    {ratingCounts[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-[#59A5B2] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">{review.guestAvatar}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {review.guestName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.property} • {review.date}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">{review.text}</p>

                  {/* Reply Section */}
                  {review.reply ? (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-4 border-l-4 border-[#59A5B2]">
                      <p className="text-sm font-semibold text-[#59A5B2] mb-1">Your Reply</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{review.reply}</p>
                    </div>
                  ) : replyingTo === review.id ? (
                    <div className="mt-4 space-y-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2] resize-none"
                        rows={3}
                        data-testid={`reply-textarea-${review.id}`}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTimes} className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitReply(review.id)}
                          className="px-4 py-2 rounded-lg bg-[#59A5B2] hover:bg-[#4a9199] text-white transition-colors"
                          data-testid={`submit-reply-${review.id}`}
                        >
                          <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4 mr-2" />
                          Send Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingTo(review.id)}
                      className="flex items-center gap-2 text-[#59A5B2] hover:text-[#4a9199] text-sm font-medium transition-colors"
                      data-testid={`reply-button-${review.id}`}
                    >
                      <FontAwesomeIcon icon={faReply} className="w-4 h-4" />
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OwnerLayout>
  );
}
