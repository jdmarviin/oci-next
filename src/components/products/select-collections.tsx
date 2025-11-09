/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { useUser } from "@/context/user-provider";

interface SelectCollectionsProps {
  value?: string[];
  onChange?: (values: string[]) => void;
  name?: string;
  placeholder?: string;
}

export default function SelectCollections({ 
  value = [], 
  onChange,
  name = "collections",
  placeholder = "Select collections..."
}: SelectCollectionsProps) {
  const { user } = useUser();
  const collections = user?.integrations.find(
    (intgration: any) => intgration.selected
  )?.collections;

  return (
    <>
      <MultiSelect values={value} onValuesChange={onChange}>
        <MultiSelectTrigger className="w-full max-w-[400px]">
          <MultiSelectValue placeholder={placeholder} />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            {collections?.custom_collections?.length > 0 &&
              collections.custom_collections.map((collection: any) => (
                <MultiSelectItem key={collection.id} value={String(collection.id)}>
                  {collection.title}
                </MultiSelectItem>
              ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
      
      {/* Hidden input para enviar os dados no formulário */}
      <input 
        type="hidden" 
        name={name} 
        value={JSON.stringify(value)} 
      />
    </>
  );
}
