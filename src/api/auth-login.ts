import { FieldType } from "../types";

const baseUrl = "https://dev.api-erp.najotedu.uz/api";

export default async function authLogin(values: FieldType) {
  const response = await fetch(`${baseUrl}/staff/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
};

