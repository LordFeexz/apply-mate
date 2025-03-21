import type { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { memo } from "react";
import type { LangProps } from "@/interfaces/component";
import { LANG } from "@/enums/global";
import { BANK_PAYMENT_METHOD } from "@/constants/payment";

export interface SelectBankProps extends SelectProps, LangProps {
  name: string;
  defaultValue?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

function SelectBank({
  name,
  defaultValue,
  triggerClassName,
  lang,
  contentClassName,
  ...rest
}: SelectBankProps) {
  return (
    <Select {...rest} name={name} defaultValue={defaultValue}>
      <SelectTrigger className={triggerClassName}>
        <SelectValue
          placeholder={lang === LANG.ID ? "Pilih bank" : "Select bank"}
        />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        {BANK_PAYMENT_METHOD.map(({ name }) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default memo(SelectBank);
