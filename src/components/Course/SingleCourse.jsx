import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  User,
  Tag,
  PlayCircle,
  BookOpen,
  Star,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/courses/${id}`
        );
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course:", err.message);
        setError("Error fetching course.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Video Modal Component
  const VideoModal = ({ video, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
          <X className="w-6 h-6" />
        </button>
        <div className="aspect-video w-full">
          <video
            className="w-full h-full"
            controls
            autoPlay
            src={`http://localhost:7000/uploads/${video.filename}`}>
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-4 bg-gray-900 text-white">
          <h3 className="text-xl font-semibold">{video.title}</h3>
          <p className="text-gray-300 mt-2">{video.description}</p>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl font-semibold bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );

  if (!course)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-xl font-semibold">
          Course not found.
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={`http://localhost:7000/uploads/${course.bannerImage}`}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white w-full">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500 rounded-full text-sm font-medium">
                    {course.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{course.rating}/5</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{course.creator}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(course.publishedOn)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Chapters</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {course.chapters.length}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <PlayCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Total Videos</h3>
                <p className="text-3xl font-bold text-green-600">
                  {course.chapters.reduce(
                    (total, chapter) => total + chapter.videos.length,
                    0
                  )}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Last Updated</h3>
                <p className="text-lg font-medium text-purple-600">
                  {formatDate(course.publishedOn)}
                </p>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Content */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div
                    key={chapter._id}
                    className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        setExpandedChapter(
                          expandedChapter === chapter._id ? null : chapter._id
                        )
                      }>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-semibold">
                          Chapter {chapterIndex + 1}: {chapter.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({chapter.videos.length} videos)
                        </span>
                      </div>
                      {expandedChapter === chapter._id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {expandedChapter === chapter._id && (
                      <div className="p-6 bg-white">
                        <p className="text-gray-600 mb-4">
                          {chapter.description}
                        </p>
                        <div className="space-y-3">
                          {chapter.videos.map((video, videoIndex) => (
                            <button
                              key={video._id}
                              className="w-full text-left"
                              onClick={() => setSelectedVideo(video)}>
                              <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <PlayCircle className="w-6 h-6 text-blue-500 mt-1" />
                                <div>
                                  <h4 className="font-medium">
                                    {videoIndex + 1}. {video.title}
                                  </h4>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {video.description}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-2">
                                    Added on {formatDate(video.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
