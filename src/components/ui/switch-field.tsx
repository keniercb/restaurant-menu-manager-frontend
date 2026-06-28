import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";

interface SwitchFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    description?: string;
    className?: string;
}

export function SwitchField<T extends FieldValues>({
                                                       name,
                                                       control,
                                                       label,
                                                       description,
                                                       className,
                                                   }: SwitchFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {value, onChange}, fieldState: {error}}) => (
                <div className={cn("flex items-center space-x-2", className)}>
                    <Switch
                        checked={value}
                        onCheckedChange={(checked) => {
                            console.log(checked)
                            const originalOnChange = onChange;
                            setTimeout(() => originalOnChange(checked), 0);
                        }}
                        id={name}
                    />
                    <div className="space-y-1">
                        {label && (
                            <Label htmlFor={name} className="cursor-pointer">
                                {label}
                            </Label>
                        )}
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                        {error && (
                            <p className="text-sm text-destructive">{error.message}</p>
                        )}
                    </div>
                </div>
            )}
        />
    );
}