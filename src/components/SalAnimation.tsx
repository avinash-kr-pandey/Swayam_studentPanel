import { useEffect } from "react";
import sal from "sal.js";

const SalAnimation = () => {
  useEffect(() => {
    if (typeof sal === "function") {
      sal(); // ✅ this is the actual init function
    } else if (sal && typeof sal.init === "function") {
      sal.init(); // fallback
    }
  }, []);

  return null;
};

export default SalAnimation;
