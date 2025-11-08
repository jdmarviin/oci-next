'use client'

import RealTimeUpdates from "@/components/sse/sse"
import { useProducts } from "@/context/products-provider";

const breadcrumbs: string[] = [
  'Dashboard'
]

export default function Page() {
  const { products, isLoading, refetch } = useProducts();

  return (
    <>
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center text-center gap-2 text-2xl flex-col font-semibold">
          <span>{products.filter(p => p.import_status === 'pending').length}</span>
          <span>Pending</span>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center text-center gap-2 text-2xl flex-col font-semibold">
          <span>{products.length}</span>
          <span>Products Imported</span>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center text-center gap-2 text-2xl flex-col font-semibold">
          <span>{products.filter(p => !!p.shopify_data).length}</span>
          <span>Exported to Shopify</span>
        </div>
        {/* <RealTimeUpdates /> */}
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
    </>
  )
}
