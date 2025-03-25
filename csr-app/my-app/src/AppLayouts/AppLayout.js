import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { listen } from "@tauri-apps/api/event";

const AppLayout = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(
    sessionStorage.getItem("selectedOption") || "PolicyCheck"
  );

  useEffect(() => {
    sessionStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption, navigate]);
  useEffect(() => {
    // Listen for Tauri deep link events
    const unlisten = listen("open-url", (event) => {
      console.log("Deep link received:", event.payload);

      const urlString = `csragent://${event.payload}`;
      const url = new URL(urlString);
      const jobId = url.searchParams.get("jobId") || url.searchParams.get("jobid");
      const token = url.searchParams.get("token");

      if (jobId && token) {
        navigate(`/csrView?jobId=${jobId}&token=${token}`);
      } else {
        navigate("/UnAuthorizedUser");
      }
    });

    return () => {
      unlisten.then((fn) => fn()); // Cleanup listener on unmount
    };
  }, [navigate]);


  return (
    <div>
      <div className="app-container">
        <div style={{ width: "100%" }}>
          <AppRoutes selectedOption={selectedOption} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;