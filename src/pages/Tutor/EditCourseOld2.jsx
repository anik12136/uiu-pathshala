import { useState, useEffect } from 'react';
import BannerTitleDescription from '../../components/Course/BannerTitleDescription';
import Loader from '../../components/Course/Loader';

const EditCourse = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch course data
    fetch(`https://server-uiu-pathshala.vercel.app/api/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      });
  }, [courseId]);

  const handleFieldSave = (field, value) => {
    // Update course state
    setCourse((prev) => ({ ...prev, [field]: value }));

    // Send API request
    fetch(`https://server-uiu-pathshala.vercel.app/api/courses/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
  };

  if (loading) {
    return <Loader />;
  }

  return <BannerTitleDescription course={course} onFieldSave={handleFieldSave} />;
};

export default EditCourse;
