import { createContext, useContext, useState } from "react";
// import { companies as dummyCompanies } from "../companies";

const CompanyContext = createContext();
const CompanyContextUpdate = createContext();

export const useCompany = () => useContext(CompanyContext);

export const useCompanyUpdate = () => useContext(CompanyContextUpdate);

export function CompanyProvider({ children }) {
  const [companies, setCompanies] = useState([]);

  const updateCompanies = (data) => setCompanies(data);

  return (
    <CompanyContext.Provider value={companies}>
      <CompanyContextUpdate.Provider value={updateCompanies}>
        {children}
      </CompanyContextUpdate.Provider>
    </CompanyContext.Provider>
  );
}
