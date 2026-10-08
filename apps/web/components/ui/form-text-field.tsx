"use client"

import { type HTMLInputTypeAttribute } from "react"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

type FormTextFieldProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    label: string
    description?: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoComplete?: string
}

const FormTextField = <T extends FieldValues>({
                                                  control,
                                                  name,
                                                  label,
                                                  description,
                                                  placeholder,
                                                  type = "text",
                                                  autoComplete = "off",
                                              }: FormTextFieldProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <Input
                        {...field}
                        id={field.name}
                        type={type}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                    />
                    {description && <FieldDescription>{description}</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}

export { FormTextField }