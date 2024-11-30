import { ColumnType } from "antd/es/table";
import { Contract } from "../../types";

export const columns: ColumnType<Contract>[] = [
  {
    title: "Nomi",
    dataIndex: ["attachment", "origName"],
    key: "title",
    width: 600,
  },
  {
    title: "Kurs",
    dataIndex: "title",
    key: "course",
    width: 760,
  },
];
