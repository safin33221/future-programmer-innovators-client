/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInputErrorState {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    formData?: Record<string, any>;
}
