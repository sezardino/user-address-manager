"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADDRESS_TYPE_COPY, AddressType } from "@/const/address-type";
import { cn } from "@/utils/shadcn-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { addressFormSchema, AddressFormValues } from "./address.schema";

type AddressFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: AddressFormValues) => void;
  errors?: string[];
  onFormChange?: (key: keyof AddressFormValues, value: string) => void;
};

const ADDRESS_TYPE_SELECT_ITEMS = Object.values(AddressType).map((type) => ({
  value: type,
  label: ADDRESS_TYPE_COPY[type],
}));

export const AddressForm = (props: AddressFormProps) => {
  const { onFormSubmit, className, onFormChange, ...rest } = props;

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
  });

  const onSubmit = (data: AddressFormValues) => {
    onFormSubmit(data);
  };

  const changeHandler =
    (
      key: keyof AddressFormValues,
      cb: (value: ChangeEvent<HTMLInputElement>) => void
    ) =>
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      cb(evt);
      if (onFormChange) onFormChange(key, evt.target.value);
    };

  const changeValueHandler =
    (key: keyof AddressFormValues, cb: (value: string) => void) =>
    (value: string) => {
      cb(value);
      if (onFormChange) onFormChange(key, value);
    };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("space-y-4 md:space-y-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Type</FormLabel>
              <Select
                onValueChange={changeValueHandler("type", field.onChange)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of address" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ADDRESS_TYPE_SELECT_ITEMS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-2 grid-cols-[auto,1fr]">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={3}
                    {...field}
                    onChange={changeValueHandler("countryCode", field.onChange)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>For example: USA</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="city"
                    placeholder="New York"
                    onChange={changeHandler("city", field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2 grid-cols-3">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="street"
                    placeholder="Broadway"
                    onChange={changeHandler("street", field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buildingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="buildingNumber"
                    placeholder="1"
                    onChange={changeHandler("buildingNumber", field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="postCode"
                    placeholder="07008"
                    onChange={changeHandler("postCode", field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* {errors && (
          <ul>
            {errors.map((el, index) => (
              <li key={index}>
                <Typography level="span" className="text-red-400">
                  {el.longMessage}
                </Typography>
              </li>
            ))}
          </ul>
        )} */}
      </form>
    </Form>
  );
};
