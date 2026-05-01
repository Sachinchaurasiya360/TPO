import { api } from "./api";
import type { Department, AcademicYear } from "./studentApi";

export type Role = "ADMIN" | "FACULTY" | "STUDENT" | "ALUMNI";

export interface AdminStats {
  totals: {
    students: number;
    alumni: number;
    faculty: number;
  };
  pending: {
    registrations: number;
    profileOrMarksVerifications: number;
    internshipVerifications: number;
    achievementVerifications: number;
  };
  studentsByDepartment: Array<{
    department: Department | null;
    count: number;
  }>;
}

export interface PendingRegistration {
  id: number;
  fullName: string;
  emailId: string;
  contactNo: string | null;
  studentId: string | null;
  department: Department | null;
  academicYear: AcademicYear | null;
  createdAt: string;
}

export interface StudentListItem {
  id: number;
  fullName: string;
  legalName: string | null;
  emailId: string;
  contactNo: string | null;
  studentId: string | null;
  department: Department | null;
  academicYear: AcademicYear | null;
  avgCgpa: number | null;
  role: Role;
  profilePic: string | null;
  resumeUrl: string | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface StudentListResponse {
  items: StudentListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface StudentListFilters {
  page?: number;
  limit?: number;
  department?: Department;
  academicYear?: AcademicYear;
  role?: "STUDENT" | "ALUMNI";
  isVerified?: boolean;
  isActive?: boolean;
  minCgpa?: number;
  search?: string;
}

export interface StudentProject {
  id: string;
  title: string;
  description: string | null;
  techStack: string[];
  projectUrl: string | null;
  repoUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  isVerified: boolean;
  createdAt: string;
}

export interface StudentDetailResponse {
  user: StudentListItem & {
    parentsContactNo: string | null;
    skills: string[];
    socialProfile: string | null;
  };
  marks: Record<string, unknown> | null;
  internships: Array<Record<string, unknown>>;
  achievements: Array<Record<string, unknown>>;
  projects: StudentProject[];
  pendingVerifications: Array<Record<string, unknown>>;
}

export interface FacultyListItem {
  id: number;
  fullName: string;
  emailId: string;
  contactNo: string | null;
  department: Department | null;
  isHOD: boolean;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface FacultyDetailResponse {
  faculty: FacultyListItem;
}

export interface CreateFacultyPayload {
  fullName: string;
  emailId: string;
  contactNo: string;
  department: Department;
  isHOD?: boolean;
  password?: string;
}

export interface UpdateFacultyPayload {
  fullName?: string;
  contactNo?: string;
  department?: Department;
  isHOD?: boolean;
}

export const getStats = async (): Promise<AdminStats> => {
  const { data } = await api.get<AdminStats>("/admin/stats");
  return data;
};

export interface PlacementReportItem {
  id: string;
  appliedAt: string;
  updatedAt: string;
  student: {
    id: number;
    fullName: string;
    emailId: string;
    studentId: string | null;
    department: Department | null;
    academicYear: AcademicYear | null;
    avgCgpa: number | null;
  };
  job: {
    id: string;
    companyName: string;
    jobTitle: string;
    package: string | null;
    jobType: string | null;
    location: string | null;
  };
}

export interface PlacementReport {
  items: PlacementReportItem[];
  generatedAt: string;
}

export const getPlacementReport = async (): Promise<PlacementReport> => {
  const { data } = await api.get<PlacementReport>("/admin/placement-report");
  return data;
};

export const listPendingRegistrations = async (): Promise<PendingRegistration[]> => {
  const { data } = await api.get<{ items: PendingRegistration[] }>(
    "/admin/registrations"
  );
  return data.items;
};

export const approveRegistration = async (id: number): Promise<void> => {
  await api.post(`/admin/registrations/${id}/approve`);
};

export const rejectRegistration = async (
  id: number,
  reason?: string
): Promise<void> => {
  await api.post(`/admin/registrations/${id}/reject`, { reason });
};

export const listFaculty = async (): Promise<FacultyListItem[]> => {
  const { data } = await api.get<{ items: FacultyListItem[] }>("/admin/faculty");
  return data.items;
};

export const getFacultyDetail = async (
  id: number
): Promise<FacultyDetailResponse> => {
  const { data } = await api.get<FacultyDetailResponse>(`/admin/faculty/${id}`);
  return data;
};

export const createFaculty = async (
  payload: CreateFacultyPayload
): Promise<FacultyListItem> => {
  const { data } = await api.post<{ faculty: FacultyListItem }>(
    "/admin/faculty",
    payload
  );
  return data.faculty;
};

export const updateFaculty = async (
  id: number,
  payload: UpdateFacultyPayload
): Promise<FacultyListItem> => {
  const { data } = await api.patch<{ faculty: FacultyListItem }>(
    `/admin/faculty/${id}`,
    payload
  );
  return data.faculty;
};

export const listStudents = async (
  filters: StudentListFilters = {}
): Promise<StudentListResponse> => {
  const params: Record<string, string | number | boolean> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      params[key] = value as string | number | boolean;
    }
  });
  const { data } = await api.get<StudentListResponse>("/admin/students", { params });
  return data;
};

export const getStudentDetail = async (
  id: number
): Promise<StudentDetailResponse> => {
  const { data } = await api.get<StudentDetailResponse>(`/admin/students/${id}`);
  return data;
};

export const graduateStudent = async (id: number): Promise<void> => {
  await api.post(`/admin/students/${id}/graduate`);
};

export const setUserStatus = async (
  id: number,
  isActive: boolean
): Promise<void> => {
  await api.patch(`/admin/users/${id}/status`, { isActive });
};
