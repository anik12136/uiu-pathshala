import React from 'react';
import CourseCard from '../../../components/CourseCard';
import useCourses from '../../../Hooks/useCourses';

const DashboardCourses = () => {

    const { courses, loading, error } = useCourses();
    if (loading) {
        return <p>Loading courses...</p>;
    }
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default DashboardCourses;