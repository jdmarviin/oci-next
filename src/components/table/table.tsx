"use client";
import { Product } from "@/actions/products";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { ColumnDef } from "@/components/ui/shadcn-io/table";
import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from "@/components/ui/shadcn-io/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Image from "next/image";
import Link from "next/link";

export default function FeatureTable({ products }: { products: Product[] }) {
  const redirectToPage = (url: string) => {
    window.location.href = url;
  };

  const columns: ColumnDef<(typeof products)[number]>[] = [
    {
      accessorKey: "produtos",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Produtos" />
      ),
      cell: ({ row }) => (
        <HoverCard>
          <HoverCardTrigger>
            <div
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={() => redirectToPage(`/import/${row.original.id}`)}
            >
              <div className="relative">
                <Avatar className="size-12">
                  <AvatarImage
                    src={row.original?.scrapper_data?.["media"][0]["url"]}
                  />
                </Avatar>
              </div>
              <div>
                <span className="font-medium !max-w-[500px] overflow-hidden whitespace-nowrap text-ellipsis block">
                  {row.original?.scrapper_data?.["title"]}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground text-xs"></div>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="block box-border">
            <Link href={row.original.product_url} target="_blank">
              <div className="w-[300px] h-[400px] border rounded p-4 bg-primary-foreground box-border">
                <Image
                  src={row.original?.scrapper_data?.["media"][0]["url"]}
                  width={300}
                  height={400}
                  alt="Foto"
                  className="rounded mb-1"
                />
                <div className="text-wrap border rounded p-1">
                  {row.original?.scrapper_data?.["title"]}
                </div>
              </div>
            </Link>
          </HoverCardContent>
        </HoverCard>
      ),
    },
  ];
  return (
    <>
      <TableProvider
        columns={columns}
        data={products}
        className="max-w-[70%] border rounded"
      >
        <TableHeader>
          {({ headerGroup }) => (
            <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}>
              {({ header }) => <TableHead header={header} key={header.id} />}
            </TableHeaderGroup>
          )}
        </TableHeader>
        <TableBody>
          {({ row }) => (
            <TableRow key={row.id} row={row}>
              {({ cell }) => <TableCell cell={cell} key={cell.id} />}
            </TableRow>
          )}
        </TableBody>
      </TableProvider>
    </>
  );
}
