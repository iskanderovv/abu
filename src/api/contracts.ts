import { CreateContract } from "../types";

const baseUrl = "https://dev.api-erp.najotedu.uz/api";

const accessToken = localStorage.getItem("accessToken");

// get contracts
export default async function getContracts({
  page = 1,
  perPage = 10,
  search = "",
} = {}) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
    search,
  }).toString();

  const response = await fetch(
    `${baseUrl}/staff/contracts/all?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const result = await response.json();
  return {
    data: result.data.contracts || [],
    total: result.data.total || 0,
  };
}

// get courses
export async function getCourses() {
  const response = await fetch(`${baseUrl}/staff/courses?page=1&perpage=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
}

// faylni yuklash
export const uploadAttachment = async (file: File) => {
  const formData = new FormData();
  formData.append("files", file);

  try {
    const response = await fetch(
      `${baseUrl}/staff/upload/contract/attachment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Faylni yuklab bo‘lmadi");
    }

    return response.json();
  } catch (error) {
    console.error("Xatolik:", error);
    throw error;
  }
};

// create contract
export const createContract = async (data: CreateContract) => {
  try {
    const response = await fetch(`${baseUrl}/staff/contracts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Shartnomani yaratib bo‘lmadi");
    }

    return response.json();
  } catch (error) {
    console.error("Xatolik:", error);
    throw error;
  }
};

// get created contract
export const getCreatedContract = async (contractId: number) => {
  try {
    const response = await fetch(`${baseUrl}/staff/contracts/${contractId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Shartnomani olib bo‘lmadi");
    }

    return response.json();
  } catch (error) {
    console.error("Xatolik:", error);
    throw error;
  }
};


// edit created contract
export const editCreatedContract = async (contractId: number, data: CreateContract) => {
  try {
    const response = await fetch(`${baseUrl}/staff/contracts/${contractId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Shartnomani olib bo‘lmadi");
    }

    return response.json();
  } catch (error) {
    console.error("Xatolik:", error);
    throw error;
  }
};


