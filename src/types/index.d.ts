export type FieldType = {
  login: string;
  password: string;
  fcmToken?: string;
};

export interface Attachment {
  url: string;
  origName: string;
  size: number;
}

export interface Course {
  id: number;
  name: string;
  createdAt: string;
}

export interface Contract {
  id: number;
  course: Course;
  title: string;
  attachment: Attachment;
  createdAt: string;
}

export interface CreateContract{
  title: string;
  courseId: number;
  attachment: Attachment;
}

export interface Course {
  id: number;
  name: string;
  disciplineId: number;
  disciplineName: string;
  hasCurriculum: boolean;
  hasStudyMonths: boolean;
  createdAt: string;
  imageIllustration: string;
}
