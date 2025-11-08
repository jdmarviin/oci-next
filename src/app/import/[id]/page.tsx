/* eslint-disable @typescript-eslint/no-explicit-any */
import getProduct from "@/actions/get_product";
import ProductDetail from "@/components/products/product-detail";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { notFound } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};

export default async function ImportProductDetailPage({ params }: Params) {
  const p = await params;
  const id = p.id;

  console.log(id);
  const { ok, data, error } = await getProduct(id);

  const _data = data?.["ai_data"] ? data["ai_data"] : data?.["scrapper_data"];

  // const clonedProduct = structuredClone(_data)
  // console.log(clonedProduct);

  if (error || !ok) return notFound();

  if (!ok)
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Spinner variant="bars" />
      </div>
    );
  return <ProductDetail id={id} data={data} />;
}
