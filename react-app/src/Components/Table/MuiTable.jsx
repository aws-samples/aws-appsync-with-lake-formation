import { DataGrid } from "@mui/x-data-grid";
import { useCompany } from "../../Contexts/CompanyContext";

import "./mui-table.css";

const columns = [
  {
    field: "first_name",
    headerName: "First Name",
    type: "string",
    headerClassName: "table-header",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "last_name",
    headerName: "Last Name",
    type: "string",
    headerClassName: "table-header",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "company_name",
    headerName: "Company Name",
    type: "string",
    headerClassName: "table-header",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Company Status",
    type: "string",
    headerClassName: "table-header",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "category_code",
    headerName: "Category",
    type: "string",
    headerClassName: "table-header",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "continent",
    headerName: "Country",
    type: "string",
    headerClassName: "table-header",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
];

const Table = (_) => {
  const companies = useCompany();

  const showCheckEvery = (property) => {
    const columnIsNull = (company) => (company[property] ? true : false);

    if (companies.length === 0) return false;

    return companies.every(columnIsNull);
  };

  return (
    <DataGrid
      sx={{
        overflowX: "hidden",
        ".MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        ".mui-table-cell": {
          justifyContent: "center",
        },
      }}
      rows={companies}
      columns={columns}
      disableColumnMenu
      pagination
      getCellClassName={(_) => "mui-table-cell"}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      columnVisibilityModel={{
        first_name: showCheckEvery("first_name"),
        last_name: showCheckEvery("last_name"),
        company_name: showCheckEvery("company_name"),
        status: showCheckEvery("status"),
        category_code: showCheckEvery("category_code"),
        continent: showCheckEvery("continent"),
      }}
      pageSizeOptions={[10, 20, 30]}
      disableRowSelectionOnClick
      getRowId={(row) => row.company_id}
    />
  );
};

export default Table;
