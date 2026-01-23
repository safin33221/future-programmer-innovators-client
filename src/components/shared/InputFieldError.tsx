
import { FieldDescription } from "../ui/field";
import { getInputFieldError, IInputErrorState } from "./getInputFieldsError";

interface InputFieldErrorProps {
    field: string;
    state: IInputErrorState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
    console.log({ field, state });
    if (getInputFieldError(field, state)) {
        return (
            <FieldDescription className="text-red-600">
                {getInputFieldError(field, state)}
            </FieldDescription>
        );
    }

    return null;
};

export default InputFieldError;