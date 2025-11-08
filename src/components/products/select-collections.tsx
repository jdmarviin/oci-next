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

export default function SelectCollections() {
  const { user } = useUser();
  const collections = user?.integrations.find(
    (intgration: any) => intgration.selected
  ).collections;

  return (
    <>
      <MultiSelect>
        <MultiSelectTrigger className="w-full max-w-[400px]">
          <MultiSelectValue placeholder="Select collections..." />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            {collections?.custom_collections.length &&
              collections?.custom_collections.map((collection: any) => (
                <MultiSelectItem key={collection.id} value={collection.id}>
                  {collection.title}
                </MultiSelectItem>
              ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    </>
  );
}
