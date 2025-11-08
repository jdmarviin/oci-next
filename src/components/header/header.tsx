"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDownIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../darkmode/darkmode";
import { Button } from "../ui/button";

export default function Header() { 
  const params = usePathname();
  const breadcrumbs = params.split('/')

  return (
    <header
      className="flex h-16 shrink-0 items-center gap-2 transition-[width,height]
    ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border my-4 rounded"
    >
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center justify-between w-full">
          <Breadcrumb>
            <BreadcrumbList className="text-[18px] font-semibold">
              {breadcrumbs && breadcrumbs?.length ? (
                breadcrumbs.map((bc, idx) => (
                  <div key={idx} className="flex items-center">
                    <BreadcrumbItem className="hidden md:block" key={bc}>
                      <BreadcrumbLink href={`/${bc}`}>{bc}</BreadcrumbLink>
                    </BreadcrumbItem>
                    {!!breadcrumbs[idx + 1] && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </div>
                ))
              ) : (
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              )}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="actions-wrapper flex items-center gap-4">
            <ModeToggle />
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 px-2 py-0 hover:bg-accent hover:text-accent-foreground"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={'userAvatar'} alt={'userName'} />
                    <AvatarFallback className="text-xs">
                      {'userName'
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDownIcon className="h-3 w-3 ml-1" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {'userName'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {'userEmail'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* <div className="hover:bg-gray-400 rounded-[4px] p-1 cursor-pointer">
              <Bell />
            </div>
            <div className="hover:bg-gray-400 rounded-[4px] p-1 cursor-pointer">
              <User />
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}
