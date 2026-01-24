/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IInputErrorState } from "@/types/action";

/* =========================
   Types
========================= */
export interface CreateDepartmentPayload {
    name: string;
}

export interface Department {
    id: string;
    name: string;
}

/* =========================
   Create Department (Admin)
========================= */
export const createDepartment = async (
    _prevState: IInputErrorState | null,
    formData: FormData
): Promise<IInputErrorState> => {
    try {
        const payload: CreateDepartmentPayload = {
            name: formData.get("name") as string,
        };

        const res = await serverFetch.post("/departments", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const error = await res.json();

            return {
                success: false,
                message: error.message,
                errors: error.errors,
                formData: payload,
            };
        }

        return {
            success: true,
            message: "Department created successfully",
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};

/* =========================
   Get All Departments (Public)
========================= */
export const getAllDepartments = async (): Promise<Department[]> => {
    const res = await serverFetch.get("/departments");

    if (!res.ok) {
        throw new Error("Failed to fetch departments");
    }

    return res.json();
};

/* =========================
   Get Single Department
========================= */
export const getDepartmentById = async (
    id: string
): Promise<Department> => {
    const res = await serverFetch.get(`/departments/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch department");
    }

    return res.json();
};

/* =========================
   Delete Department (Admin)
========================= */
export const deleteDepartment = async (id: string) => {
    const res = await serverFetch.delete(`/departments/${id}`);

    if (!res.ok) {
        throw new Error("Failed to delete department");
    }

    return res.json();
};
