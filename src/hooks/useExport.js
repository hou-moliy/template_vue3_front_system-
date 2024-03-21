// 导出
import { saveAs } from "file-saver";
// excel
import * as XLSX from "xlsx";
// 文件类型枚举
const fileType = {
  xls: "application/vnd.ms-excel;charset=utf-8",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
  doc: "application/msword;charset=utf-8",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8",
  pdf: "application/pdf;charset=utf-8",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
};
// 导出文件
export const exportFile = (data, type, fileName) => {
  //⚠️注意：需要配置你需要导出的文件类型
  const blob = new Blob([data], { type: fileType[type] });
  saveAs(blob, fileName);
};

// 下载文件-接口返回的是文件流，需要配置responseType: "blob"
export const handleDownload = (promise, type, fileName) => {
  return new Promise(resolve => {
    promise.then(res => {
      if (res.data.size == 0) {
        ElMessage.warning("文件不存在");
        return;
      }
      exportFile(res.data, type, fileName);
      resolve();
    });
  });
};
//导出excel
export const exportExcel = (json, fields, filename = "测试数据.xlsx") => {
  let sheetName = filename; //excel的文件名称
  let wb = XLSX.utils.book_new(); //工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
  let ws = XLSX.utils.json_to_sheet(json, { header: Object.values(fields) }); //将JS对象数组转换为工作表。
  wb.SheetNames.push(sheetName);
  wb.Sheets[sheetName] = ws;
  const defaultCellStyle = { font: { name: "Verdana", sz: 13, color: "FF00FF88" }, fill: { fgColor: { rgb: "FFFFAA00" } } }; //设置表格的样式
  let wopts = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
    cellStyles: true,
    defaultCellStyle: defaultCellStyle,
    showGridLines: false
  }; //写入的样式
  let wbout = XLSX.write(wb, wopts);
  let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  saveAs(blob, filename + ".xlsx");
};
const s2ab = s => {
  if (typeof ArrayBuffer !== "undefined") {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    let buf = new Array(s.length);
    for (let i = 0; i < s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
};
