import { PieChart as PieGraph, Pie, Tooltip } from "recharts";
import { useCompaniesStatus } from "../../Contexts/CompaniesStatusContext";

import "./pie-chart.css";

const PieChart = (_) => {
  const companiesByStatus = useCompaniesStatus();

  const renderLabel = (company) => {
    return company.status;
  };

  return (
    <PieGraph width={450} height={300}>
      <Pie
        data={companiesByStatus}
        dataKey="count"
        nameKey="status"
        fill="#8884d8"
        label={renderLabel}
      />
      <Tooltip />
    </PieGraph>
  );
};

export default PieChart;
