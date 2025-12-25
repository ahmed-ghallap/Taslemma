import { useEffect } from "react";
import Home from "./pages/home/Index.jsx";
import updateFavicon from "@utils/updateFavicon";

function App() {
  useEffect(() => {
    updateFavicon();

    const observer = new MutationObserver(updateFavicon);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return <Home />;
}

export default App;
