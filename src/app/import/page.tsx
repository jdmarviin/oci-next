'use client'

import FeatureTable from "@/components/table/table";
import { useProducts } from "@/context/products-provider";
import { useEffect } from "react";
import { Spinner } from '@/components/ui/shadcn-io/spinner';

const breadcrumbs: string[] = ["Import"];

export default function ImportPage() {
  const { products, isLoading, error, refetch } = useProducts();

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

  useEffect(() => {
    console.log(products);  
  })

  if (isLoading) return <div className="w-full h-[80vh] flex justify-center items-center"><Spinner variant="bars" /></div>;
  if (error) return <div>Erro: {error} <button onClick={refetch}>Tentar novamente</button></div>;

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

        { products.length && <FeatureTable products={products} /> }
      </main>
    </>
  );
}
