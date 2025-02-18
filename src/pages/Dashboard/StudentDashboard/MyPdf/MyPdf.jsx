import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MyPdfShow from './MyPdfShow/MyPdfShow';
import MyPdfUpload from './MyPdfUpload/MyPdfUpload';

const MyPdf = () => {
    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab>My pdf</Tab>
                    <Tab>Upload</Tab>
                </TabList>

                <TabPanel>
                   <MyPdfShow></MyPdfShow>
                </TabPanel>
                <TabPanel>
                    <MyPdfUpload></MyPdfUpload>
                </TabPanel>
            </Tabs>

        </div>
    );
};

export default MyPdf;