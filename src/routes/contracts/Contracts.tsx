import React from "react";
import { Table, Input, Button, Pagination } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

const data = [
  { key: "1", name: "File_Alpha.txt", course: "Social Media Marketing" },
  { key: "2", name: "Document_Beta.docx", course: "Other Services" },
  { key: "3", name: "Report_Gamma.pdf", course: "Programming" },
  { key: "4", name: "Presentation_Delta.pptx", course: "Graphic Design" },
  { key: "5", name: "Notes_Epsilon.txt", course: "Content Creation" },
  { key: "6", name: "Summary_Zeta.docx", course: "Web Development" },
  { key: "7", name: "Analysis_Eta.pdf", course: "Brand Strategy" },
  { key: "8", name: "Overview_Theta.pptx", course: "Digital Marketing" },
  { key: "9", name: "Draft_Iota.txt", course: "SEO Optimization" },
  { key: "10", name: "Final_Jota.docx", course: "Video Production" },
  { key: "11", name: "Outline_Kappa.pdf", course: "User Experience Design" },
  { key: "12", name: "Checklist_Lambda.pptx", course: "Email Marketing" },
  { key: "13", name: "Plan_Mu.txt", course: "Photography Services" },
  { key: "14", name: "Schedule_Nu.docx", course: "Print Design" },
  { key: "15", name: "Review_Xi.pdf", course: "Illustration Services" },
];

const columns: ColumnType<{ key: string; name: string; course: string; }>[] = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
    width: "5%",
    align: "center"
  },
  {
    title: "Nomi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Kurs",
    dataIndex: "course",
    key: "course",
  },
  {
    key: "action",
    render: () => (
      <div className="text-center">
        <EllipsisOutlined className="cursor-pointer" />
      </div>
    ),
    align: undefined,
  },
];

const Contracts: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Qidiruv"
          className="w-1/3"
          size="large"
        />
        <Button type="primary" size="large">
          Qo'shish
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="shadow-md border rounded-md"
      />

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">10 / page</span>
        <Pagination defaultCurrent={1} total={150} />
      </div>
    </div>
  );
};

export default Contracts;
