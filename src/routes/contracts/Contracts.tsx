import React, { useEffect, useState } from "react";
import { Table, Input, Button, Pagination, Spin, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { columns as baseColumns } from "./contracts-columns";
import getContracts from "../../api/contracts";
import { Contract } from "../../types";
import EditModal from "../../components/EditModal";
import AddModal from "../../components/AddModal";
import { GoPencil } from "react-icons/go";

const Contracts: React.FC = () => {
  const [data, setData] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );

  const fetchContracts = async (page = 1, perPage = 10, search = "") => {
    try {
      setLoading(true);
      const response = await getContracts({ page, perPage, search });
      const contracts = Array.isArray(response.data) ? response.data : [];
      setData(contracts);
      setTotal(response.total || 0);
    } catch (error) {
      console.error("Failed to fetch contracts:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts(currentPage, pageSize, searchTerm);
  }, [currentPage, pageSize, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleEditClick = (record: Contract) => {
    setSelectedContract(record);
    setIsEditModalOpen(true);
  };

  (record: Contract) => (
    <Menu className="relative right-[90px] -top-3">
      <Menu.Item key="edit" onClick={() => handleEditClick(record)}>
        <div className="flex items-center gap-x-1 py-[2px] px-2 text-[#667085]">
          <GoPencil />
          Tahrirlash
        </div>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "#",
      key: "index",
      width: 50,
      render: (_: any, __: Contract, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    ...baseColumns,
    {
      key: "action",
      render: (_: any, record: Contract) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: (
                  <div
                    className="flex items-center gap-x-1 py-[2px] px-2 text-[#667085]"
                    onClick={() => handleEditClick(record)}
                  >
                    <GoPencil />
                    Tahrirlash
                  </div>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined className="cursor-pointer text-lg" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Qidiruv"
          className="w-1/3"
          size="large"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          type="primary"
          style={{ backgroundColor: "#36d7b7" }}
          size="large"
          onClick={() => setIsAddModalOpen(true)}
        >
          Qo'shish
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="shadow-md min-h-[60vh] border rounded-md"
          rowKey={(record) => record.id}
        />
      </Spin>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">{pageSize} / page</span>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger
        />
      </div>

      {selectedContract && (
        <EditModal
          visible={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          contract={selectedContract}
        />
      )}

      <AddModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Contracts;
