import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Api from "../api/Api";
import { updateJobList } from "../store/slices/appSlice";
import { JobList } from "./JobList";
import { MyJob } from "./MyJob";
export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    performApi();
  }, []);

  const performApi = async () => {
    // loading phase

    const responseData = {
      loading: true,
      data: [],
      error: false,
    };
    dispatch(updateJobList(responseData));

    try {
      let result = await Api().post(
        "v4/gigs/postings/list?limit=10&offset=0&is_precal_done=1&scope=recomm",
        {
          employee_id: 221516,
        }
      );
      let response = result.data;

      if (response?.status !== "fail") {
        // api success phase
        const responseData = {
          loading: false,
          data: response.data,
          error: false,
        };
        dispatch(updateJobList(responseData));
      } else {
        // api failed phase
        const responseData = {
          loading: false,
          data: [],
          error: true,
        };
        dispatch(updateJobList(responseData));
      }
    } catch {
      // api failed phase
      const responseData = {
        loading: false,
        data: [],
        error: true,
      };
      dispatch(updateJobList(responseData));
    }
  };

  return (
    <div className="bg-slate-200 h-screen pt-20">
      <div className="w-7/12 m-auto border-2 rounded border-slate-600 p-5 min-h-[20rem]">
        <Tabs>
          <TabList>
            <Tab>Job list</Tab>
            <Tab>My Jobs</Tab>
          </TabList>
          <TabPanel>
            <JobList />
          </TabPanel>
          <TabPanel>
            <MyJob />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
