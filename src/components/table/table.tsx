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
import { Badge } from "../ui/badge";
import { BadgeAlertIcon, BadgeCheckIcon } from "lucide-react";
import { Spinner } from "../ui/shadcn-io/spinner";

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
              onClick={() => row.original.scrapper_data && redirectToPage(`/import/${row.original.id}`)}
            >
              {row.original.scrapper_data && (
                <>
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
                </>
              )}
              {row.original.scrapper_data === null && (
                <>
                  <div>{row.original.product_url}</div>
                </>
              )}
            </div>
          </HoverCardTrigger>
          {row.original.scrapper_data && (
            <>
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
            </>
          )}
        </HoverCard>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.import_status === "IMPORTED" && (
            <div>
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheckIcon />
                {row.original.import_status}
              </Badge>
            </div>
          )}

          {row.original.import_status === "AI_EDITED" && (
            <div>
              <Badge variant="secondary" className="bg-primary text-white">
                <BadgeCheckIcon />
                {row.original.import_status}
              </Badge>
            </div>
          )}

          {row.original.import_status === "EXPORTED" && (
            <div>
              <Badge
                variant="secondary"
                className="bg-lime-500 text-white dark:bg-lime-600"
              >
                <BadgeCheckIcon />
                {row.original.import_status}
              </Badge>
            </div>
          )}

          {row.original.import_status === "PENDING" && (
            <div>
              <Spinner variant="bars" />
            </div>
          )}
          
          {row.original.import_status === "ERROR" && (
            <div>
              <Badge variant="secondary" className="bg-primary text-white">
                <BadgeAlertIcon />
                {row.original.import_status}
              </Badge>
            </div>
          )}
        </div>
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
