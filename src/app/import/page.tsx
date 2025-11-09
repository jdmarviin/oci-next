"use client";

import FeatureTable from "@/components/table/table";
import { useProducts } from "@/context/products-provider";
import React from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import createProduct, { ActionState } from "@/actions/import_product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const breadcrumbs: string[] = ["Import"];
const initialState: ActionState = {
  ok: false, // Initial state 'ok' should be false
  error: "",
  data: null,
};

function FormButton({ isPending }: { isPending: boolean }) {
  return (
    <>
      {isPending ? (
        <Button disabled={isPending} className="cursor-pointer">
          Importando...
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={() => console.log("Clicouu" + isPending)}
          className="cursor-pointer"
        >
          Importar
        </Button>
      )}
    </>
  );
}

export default function ImportPage() {
  const { products, isLoading, refetch } = useProducts();
  const [state, action, isPending] = React.useActionState<
    ActionState,
    FormData
  >(createProduct, initialState);

  function escapeHTML(htmlString: string): string {
    const indentSize = 4; // Tamanho da indentação em espaços
    let indentLevel = 0;

    // Função para adicionar indentação
    const indent = () => " ".repeat(indentSize * indentLevel);

    // Função para formatar a linha
    const formatLine = (line: string): string => {
      let formattedLine = line.trim();

      if (formattedLine.startsWith("</") && !formattedLine.endsWith(">")) {
        indentLevel--;
      }

      formattedLine = indent() + formattedLine;

      if (
        formattedLine.startsWith("<") &&
        !formattedLine.startsWith("</") &&
        !formattedLine.endsWith("/>")
      ) {
        indentLevel++;
      }

      return formattedLine;
    };

    // Processar o HTML
    return htmlString
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/></g, ">\n<")
      .replace(/(<\/[^>]+>)(<[^\/])/g, "$1\n$2")
      .split("\n")
      .map((line) => formatLine(line))
      .join("\n");
  }

  React.useEffect(() => {
    console.log(products);
  });

  if (isLoading)
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Spinner variant="bars" />
      </div>
    );
  // if (error)
  //   return (
  //     <div>
  //       Erro: {error} <button onClick={refetch}>Tentar novamente</button>
  //     </div>
  //   );

  return (
    <>
      <main className="">
        {/* <h1>Import Page</h1> */}

        {/* {data.data.map((item) => (
          <div key={item.id}>
            <p>{item.product_url}</p>
            <p>{item?.scrapper_data['media'][0]['url']}</p>
            <div dangerouslySetInnerHTML={{ __html: item.scrapper_data.description_html }}></div>
          </div>
        ))} */}
        <form action={action} className="flex gap-4 mb-4 max-w-[70%]">
          <Input
            type="text"
            id="url"
            name="url"
            disabled={isPending}
            required
            placeholder="Url do produto"
          />
          <FormButton isPending={isPending} />
        </form>
        {products.length && <FeatureTable products={products} />}
      </main>
    </>
  );
}
