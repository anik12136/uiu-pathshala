import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  User,
  Calendar,
  Download,
  ExternalLink,
  Book,
  FileQuestion,
  Search,
  Filter,
  PlayCircle,
  Video as VideoIcon,
  X,
  Route,
} from "lucide-react";
import banner from "../../assets/banner.jpg";

const Explore = () => {
  const [tracks, setTracks] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [filteredVideoData, setFilteredVideoData] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState("pdfs"); // 'pdfs' or 'videos'
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pdfResponse, videoResponse, trackResponse] = await Promise.all([
          axios.get("http://localhost:7000/api/upload/explore"),
          axios.get("http://localhost:7000/api/allvideos"),
          axios.get("http://localhost:7000/track/tracks"),
        ]);
        setPdfData(pdfResponse.data);
        setFilteredPdfData(pdfResponse.data);
        setVideoData(videoResponse.data);
        setFilteredVideoData(videoResponse.data);
        setTracks(trackResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredPdfs = pdfData.filter(
      (pdf) =>
        pdf.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPdfData(filteredPdfs);

    const filteredVideos = videoData.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.courseTags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredVideoData(filteredVideos);
  }, [searchTerm, pdfData, videoData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getSectionDetails = (type) => {
    switch (type) {
      case "questionPdf":
        return {
          title: "Question Papers",
          icon: FileQuestion,
          accent: "border-indigo-500",
          button: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
        };
      case "notePdf":
        return {
          title: "Study Notes",
          icon: FileText,
          accent: "border-blue-500",
          button: "bg-blue-50 text-blue-600 hover:bg-blue-100",
        };
      case "bookPdf":
        return {
          title: "Books",
          icon: Book,
          accent: "border-emerald-500",
          button: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
        };
      default:
        return {
          title: "Documents",
          icon: FileText,
          accent: "border-gray-500",
          button: "bg-gray-50 text-gray-600 hover:bg-gray-100",
        };
    }
  };

  const renderPDFCard = (pdf) => {
    const { accent } = getSectionDetails(pdf.pdfType);

    return (
      <div
        key={pdf._id}
        className={`bg-white border-l-4 ${accent} rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900 truncate flex-1">
              {pdf.filename}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{pdf.createdBy}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>{formatDate(pdf.uploadDate)}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Download className="w-4 h-4 mr-2 text-gray-400" />
              <span>{formatFileSize(pdf.size)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <a
              href={pdf.cloudinaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderVideoCard = (video) => (
    <div
      key={video.videoId}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={() => setSelectedVideo(video)}
    >
      <div className="aspect-video bg-gray-100 relative group">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-blue-500 opacity-75 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{video.creatorName}</span>
          </div>
          <div className="flex items-center">
            <Book className="w-4 h-4 mr-1" />
            <span>{video.chapterTitle}</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {video.courseTags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
            >
              {tag.replace(/"/g, "")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPDFSection = (type) => {
    const { title, icon: IconComponent } = getSectionDetails(type);
    const sectionPDFs = filteredPdfData.filter((pdf) => pdf.pdfType === type);

    if (sectionPDFs.length === 0) return null;

    return (
      <section
        className="mb-12 border-b border-gray-400 py-6 px-6 rounded-lg"
        style={{ borderWidth: "2px" }}
      >
        <div className="flex justify-center mb-6">
          <IconComponent className="w-6 h-6 mr-2 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {sectionPDFs
            .slice(0, expandedSection === type ? sectionPDFs.length : 6)
            .map(renderPDFCard)}
        </div>

        {sectionPDFs.length > 6 && (
          <div className="text-center">
            <button
              onClick={() =>
                setExpandedSection(expandedSection === type ? null : type)
              }
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              {expandedSection === type ? "Show Less" : `View All ${title}`}
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </section>
    );
  };

  const renderVideoModal = () => {
    if (!selectedVideo) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              {selectedVideo.title}
            </h3>
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="aspect-video">
            <video
              className="w-full h-full"
              controls
              src={`http://localhost:7000/uploads/${selectedVideo.filename}`}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{selectedVideo.creatorName}</span>
              </div>
              <div className="flex items-center">
                <Book className="w-4 h-4 mr-1" />
                <span>
                  {selectedVideo.courseTitle} - {selectedVideo.chapterTitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Explore Resources
          </h1>

          <div className="flex items-center justify-center mb-6">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === "pdfs"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("pdfs")}
              >
                <FileText className="w-5 h-5 inline-block mr-2" />
                PDFs
              </button>
              <button
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === "videos"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("videos")}
              >
                <VideoIcon className="w-5 h-5 inline-block mr-2" />
                Videos
              </button>
              <button
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === "tracks"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("tracks")}
              >
                <Route className="w-5 h-5 inline-block mr-2" />
                Tracks
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${
                  activeTab === "pdfs" ? "PDFs" : "videos"
                }...`}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {activeTab === "pdfs" ? (
          searchTerm && filteredPdfData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No PDFs found for "{searchTerm}"</p>
            </div>
          ) : (
            <>
              {renderPDFSection("questionPdf")}
              {renderPDFSection("notePdf")}
              {renderPDFSection("bookPdf")}
            </>
          )
        ) : (
          ""
        )}

        {activeTab === "videos" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideoData.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">
                  {searchTerm
                    ? `No videos found for "${searchTerm}"`
                    : "No videos available"}
                </p>
              </div>
            ) : (
              filteredVideoData.map(renderVideoCard)
            )}
          </div>
        ) : (
          ""
        )}

        {activeTab === "tracks" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <Link to={`/tutor/edit-track/${track._id}`} key={track._id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-orange-200 cursor-pointer">
                  {console.log(track)}
                  <img
                    src={banner}
                    alt="Track Banner"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-orange-600">
                      {track.title}
                    </h3>
                    <p className="text-gray-700 mt-2">{track.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Created by: {track.owner}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      {renderVideoModal()}
    </div>
  );
};

export default Explore;
