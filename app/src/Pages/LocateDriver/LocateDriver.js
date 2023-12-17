import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import DynamicTable from "../../Components/DynamicTable";
import { getLocateDataFromDatabase } from "../../api/TransportMaster/LocateDriverOrBus";

const LocateDriver = () => {
  const [driverData, setDriverData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);

  const fetchData = () => {
    getLocateDataFromDatabase()
      .then((data) => {
        setDriverData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }

  return (
    <div className="mt-4 w-full ov-sc">
      <div className="mt-5 max-w-full">
        <div className="flex justify-around">
          {isLoading ? (
            <Oval
              height={80}
              width={80}
              color="#343dff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#343fff"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            <div className="add-optional-sub-table">
              <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
                Add Driver
              </h1>
              <DynamicTable
                data={driverData}
                rowHeight={100}
                action={false}
                ispanding={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocateDriver;
