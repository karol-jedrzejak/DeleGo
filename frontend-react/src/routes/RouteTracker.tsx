import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {

    localStorage.setItem("previous", localStorage.getItem("current") || "/");
    localStorage.setItem("current", location.pathname);


  }, [location.pathname]);

  return null;
}

export default RouteTracker;