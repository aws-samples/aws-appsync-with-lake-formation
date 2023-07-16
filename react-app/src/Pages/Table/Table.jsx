import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Box } from "@mui/material";
import { useCompanyUpdate, useCompany } from "../../Contexts/CompanyContext";

import { getAll } from "../../graphql/queries";

import { default as TableComponent } from "../../Components/Table/MuiTable";
import Loader from "../../Components/BackdropLoader/Loader";

import refreshIcon from "../../refresh.png";

import "./table.css";

const Table = () => {
  const companies = useCompany();
  const updateCompanies = useCompanyUpdate();
  const [loading, setLoading] = useState(true);

  const getCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await API.graphql(graphqlOperation(getAll));
      console.log(data);
      updateCompanies(data.getAll);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  if (loading) return <Loader open={loading} />;

  return (
    <div className="table-page-container">
      <div className="table-wrapper">
        <button className="refresh-button" onClick={() => getCompanies()}>
          <img src={refreshIcon} alt="Refresh" height={"25px"} width={"25px"} />
        </button>
        {companies ? (
          <Box sx={{ height: 550, width: "100%" }}>
            <TableComponent />
          </Box>
        ) : (
          <h1>No data!</h1>
        )}
      </div>
    </div>
  );
};

export default Table;
