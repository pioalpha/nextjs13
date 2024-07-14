import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface InputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  itemStyles?: string;
  description: string;
}

const InputField = ({
  control,
  name,
  label,
  placeholder,
  isRequired,
  itemStyles,
  description,
}: InputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex w-full flex-col ${itemStyles}`}>
          <FormLabel className="paragraph-semibold text-dark400_light800">
            {label}
            {isRequired ? <span className="text-primary-500"> *</span> : ""}
          </FormLabel>
          <FormControl className="mt-3.5">
            <Input
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormDescription className="body-regular mt-2.5 text-light-500">
            {description}
          </FormDescription>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default InputField;
