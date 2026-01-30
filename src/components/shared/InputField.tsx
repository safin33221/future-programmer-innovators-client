/* ---------------------------------- */
/* LOCAL UI HELPERS                   */
/* ---------------------------------- */

import { Input } from "../ui/input";
import { Label } from "../ui/label";



export const InputField = ({
    label,
    name,
    value,
    onChange,
    disabled,
    placeholder,
    type = "text",
    readonly,
}: any) => (
    <div className="space-y-1">
        <Label>{label}</Label>
        <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readonly}
        />
    </div>
);