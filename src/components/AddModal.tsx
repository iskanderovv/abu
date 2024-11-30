import React, { useEffect, useState } from "react";
import { Modal, Select, Input, Upload, Button } from "antd";
import { getCourses, uploadAttachment, createContract } from "../api/contracts";
import { Course, CreateContract } from "../types";

interface AddModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ visible, onClose }) => {
  const [courseId, setCourseId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentName, setAttachmentName] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);

  const handleSave = async () => {
    try {
      const uploadedFile = attachment
        ? await uploadAttachment(attachment)
        : null;

      const contractData: CreateContract = {
        title: name,
        courseId: courseId!,
        attachment: {
          size: uploadedFile?.data[0].size || 0,
          url: uploadedFile?.data[0].path || "",
          origName: uploadedFile?.data[0].fileName || "",
        },
      };

      await createContract(contractData);
      onClose();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data.data.courses);
      } catch (error) {
        console.error("Kurslarni olishda xatolik:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Modal
      title="Shartnoma yaratish"
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90vw"
      style={{ maxWidth: "600px" }}
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
            accept=".docx"
            beforeUpload={(file) => {
              setAttachment(file);
              setAttachmentName(file.name);
              return false;
            }}
            showUploadList={false}
          >
            <Button className="w-full sm:w-[471px]">
              {attachmentName || "Fayl biriktiring"}
            </Button>
          </Upload>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Bekor qilish
          </Button>
          <Button
            type="primary"
            className="bg-primary hover:bg-primary focus:bg-primary active:bg-primary w-full sm:w-auto"
            onClick={handleSave}
            disabled={!name || !courseId || !attachment}
          >
            Saqlash
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
