// 导出
import { saveAs } from "file-saver";
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
export const exportFile = (data, type, fileName) => {
  //⚠️注意：需要配置你需要导出的文件类型
  const blob = new Blob([data], { type: fileType[type] });
  saveAs(blob, fileName);
};
