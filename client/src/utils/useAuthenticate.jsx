import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROLES } from "./Localization";

const useAuthenticate = () => {
  const token = localStorage.getItem("token");
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [isRegionalAdmin, setIsRegionalAdmin] = useState(false);
  const [isSendingPartner, setIsSendingPartner] = useState(false);
  const [isRecevingPartner, setIsRecevingPartner] = useState(false);
  const location = useLocation();
  const isAuthenticated = !!token;

  useEffect(() => {
    const role = localStorage.getItem("role");
    // console.log("🚀 ~ useAuthenticate ~ role:", role);

    if (role) {
      // Set individual states based on the role
      setIsGlobalAdmin(role === ROLES.GLOBAL_ADMIN);
      setIsRegionalAdmin(role === ROLES.REGIONAL_ADMIN);
      setIsSendingPartner(role === ROLES.SENDER_PARTNER);
      setIsRecevingPartner(role === ROLES.RECEIVING_PARTNER);
    }
  }, [location]);

  return {
    isAuthenticated,
    token,
    isGlobalAdmin,
    isRegionalAdmin,
    isSendingPartner,
    isRecevingPartner,
  };
};

export default useAuthenticate;
