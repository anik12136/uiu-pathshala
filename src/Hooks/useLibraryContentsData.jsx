import React, { useEffect, useState } from 'react';

const useLibraryContentsData = () => {
    const [subjects, setSubjects] = useState([]);
    useEffect(() => {
      fetch("../../../public/fakeDB/subjects.json")
        .then((res) => res.json())
        .then((data) => setSubjects(data));
    }, []);
    return subjects;
};

export default useLibraryContentsData;