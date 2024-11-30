import React, { useEffect, useState } from "react";
import { Modal, Select, Input, Upload, Button } from "antd";
import {
  getCourses,
  uploadAttachment,
  editCreatedContract,
  getCreatedContract,
} from "../api/contracts";
import { Contract, Course, CreateContract } from "../types";

interface AddModalProps {
  visible: boolean;
  onClose: () => void;
  contract: Contract;
}

const EditModal: React.FC<AddModalProps> = ({ visible, onClose, contract }) => {
  const [courseId, setCourseId] = useState<number | null>(contract.id || null);
  const [name, setName] = useState(contract.title || "");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentName, setAttachmentName] = useState<string>(
    contract?.attachment?.origName || ""
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [createdContract, setCreatedContract] = useState<Contract | null>(null);

  const handleSave = async () => {
    if (!courseId || !name) {
      alert("Kursni va nomini tanlash zarur");
      return;
    }

    try {
      const uploadedFile = attachment
        ? await uploadAttachment(attachment)
        : null;

      const contractData: CreateContract = {
        title: name,
        courseId: courseId,
        attachment: uploadedFile
          ? {
              size: uploadedFile?.data[0].size || 0,
              url: uploadedFile?.data[0].path || "",
              origName: uploadedFile?.data[0].fileName || "",
            }
          : createdContract?.attachment || { url: "", origName: "", size: 0 },
      };

      console.log(contractData);

      await editCreatedContract(contract.id, contractData);
      onClose();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        const data2 = await getCreatedContract(contract.id);
        setCreatedContract(data2.data);
        setCourses(data.data.courses);
      } catch (error) {
        console.error("Kurslarni olishda xatolik:", error);
      }
    };

    fetchCourses();
  }, [contract.id]);

  return (
    <Modal
      title="Shartnoma o'zgartirish"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Kurs</label>
          <Select
            placeholder="Kursni tanlang"
            className="w-full"
            onChange={(value) => setCourseId(value)}
            options={courses?.map((course) => ({
              value: course.id,
              label: course.name,
            }))}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Nomi</label>
          <Input
            placeholder="Nomini kiriting"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fayl</label>
          <Upload
            className="w-full"
            style={{ width: "200px" }}
            accept=".docx"
            beforeUpload={(file) => {
              setAttachment(file);
              setAttachmentName(file.name);
              return false;
            }}
            showUploadList={false}
          >
            <Button className="w-full">
              {attachmentName ||
                createdContract?.attachment?.origName ||
                "Fayl biriktiring"}
            </Button>
          </Upload>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button
            type="primary"
            className="bg-primary hover:bg-primary focus:bg-primary active:bg-primary"
            onClick={handleSave}
            disabled={!courseId || !name}
          >
            Saqlash
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
