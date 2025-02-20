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
} from "lucide-react";

const Explore = () => {
  const [pdfData, setPdfData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null); // Track expanded section

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/upload/explore"
        );
        setPdfData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };
    fetchPDFs();
  }, []);

  useEffect(() => {
    const filtered = pdfData.filter(
      (pdf) =>
        pdf.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, pdfData]);

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
        className={`bg-white border-l-4 ${accent} rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}>
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
              className="flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium transition-colors duration-200">
              <ExternalLink className="w-4 h-4 mr-2" />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderPDFSection = (type) => {
    const { title, icon: IconComponent } = getSectionDetails(type);
    const sectionPDFs = filteredData.filter((pdf) => pdf.pdfType === type);

    if (sectionPDFs.length === 0) return null;

    return (
      <section
        className="mb-12 border-b border-gray-400 py-6 px-6 rounded-lg"
        style={{ borderWidth: "2px" }}>
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
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              {expandedSection === type ? "Show Less" : `View All ${title}`}
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Explore Resources
          </h1>

          <div className="flex items-center justify-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by filename or author..."
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

        {searchTerm && filteredData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No results found for "{searchTerm}"</p>
          </div>
        ) : (
          <>
            {renderPDFSection("questionPdf")}
            {renderPDFSection("notePdf")}
            {renderPDFSection("bookPdf")}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
