import React from "react";
import { useSelector } from "react-redux";

export const JobList = () => {
  const { jobListApiLoading, jobListData, jobListApiError } = useSelector(
    (state) => state.appSlice
  );

  return (
    <div>
      {jobListApiLoading ? (
        // loading phase
        <div>
          {Array.apply(null, Array(2)).map((effect, index) => {
            return (
              <div className="bg-slate-300 p-5 rounded h-30 mb-3">
                <h1>Loading..!</h1>
              </div>
            );
          })}
        </div>
      ) : // api error
      jobListApiError ? (
        <div className="bg-slate-300 p-5 rounded ">
          <h1>Something went wrong!</h1>
        </div>
      ) : // data not empty
      jobListData.length > 0 ? (
        <>
          {jobListData.map((item, index) => {
            let location = item?.cmpny?.loc?.cty;
            let title = item?.dtls?.ttl;

            return (
              <div className="bg-slate-300 p-5 rounded mb-2">
                <h1 className="text-2xl">{title}</h1>
                <p>{location}</p>
                <div className="flex justify-end">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Apply
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        // data empty
        <div className="bg-slate-300 p-5 rounded ">
          <h1 className="text-2xl">No data found</h1>
        </div>
      )}
    </div>
  );
};
