import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TruncatedTypography } from "@/components/ui/typography";
import { AddressType } from "@/const/address-type";
import { cn } from "@/utils/shadcn-ui";
import { Building, Flag, LucideIcon, Mail, Map, MapPin } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

export type AddressPreviewProps = ComponentPropsWithoutRef<"div"> & {
  type: AddressType;
  city: string;
  countryCode: string;
  street: string;
  buildingNumber: string;
  postCode: string;
};

export const AddressPreview = (props: AddressPreviewProps) => {
  const {
    type,
    city,
    countryCode,
    street,
    buildingNumber,
    postCode,
    className,
    ...rest
  } = props;

  return (
    <Card {...rest} className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Address</CardTitle>
        {type && <Badge variant="outline">{type}</Badge>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 gap-y-4">
          <AddressField label="Street" icon={MapPin} value={street} />
          <AddressField
            label="Building Number"
            icon={Building}
            value={buildingNumber}
          />
          <AddressField label="City" icon={Map} value={city} />
          <AddressField label="Post Code" icon={Mail} value={postCode} />
          <AddressField label="Country Code" icon={Flag} value={countryCode} />
        </div>
      </CardContent>
    </Card>
  );
};

type AddressFieldProps = ComponentPropsWithoutRef<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

const AddressField = (props: AddressFieldProps) => {
  const { icon: Icon, label, value, className, ...rest } = props;

  const emptyStateJSX = (
    <span className="text-sm text-muted-foreground">Data not provided</span>
  );

  return (
    <div {...rest} className={cn("flex items-center", className)}>
      <Icon className="mr-2 mt-1 opacity-70 flex-shrink-0 size-5" />
      <div className="w-full flex flex-col">
        <span className="text-xs text-muted-foreground font-bold">
          {label}:
        </span>

        {!value ? emptyStateJSX : <TruncatedTypography text={value} />}
      </div>
    </div>
  );
};
