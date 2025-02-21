import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MyQuestionShow from './MyQuestionShow/MyQuestionShow';
import MyQuestionUpload from './MyQuestionUpload/MyQuestionUpload';

const MyQuestions = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
            <Tabs className="w-full">
                <TabList className="flex justify-start space-x-4 mb-6 border-b border-gray-300">
                    <Tab className="py-2 px-6 text-lg font-medium text-gray-600 cursor-pointer transition-colors duration-300 ease-in-out hover:text-blue-500 hover:border-b-2 hover:border-blue-500 focus:outline-none">
                        My Questions
                    </Tab>
                    <Tab className="py-2 px-6 text-lg font-medium text-gray-600 cursor-pointer transition-colors duration-300 ease-in-out hover:text-blue-500 hover:border-b-2 hover:border-blue-500 focus:outline-none">
                        Upload
                    </Tab>
                </TabList>

                <TabPanel className="space-y-6">
                    <MyQuestionShow></MyQuestionShow>
                </TabPanel>
                <TabPanel className="space-y-6">
                    <MyQuestionUpload></MyQuestionUpload>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default MyQuestions;