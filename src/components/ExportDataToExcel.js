import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportDataToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    console.log(apiData);
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="xls-export-btn"
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      <i className="bi bi-cloud-arrow-down"></i>
    </button>
  );
};
