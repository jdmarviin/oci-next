/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ProductActions } from "./product-actions";
import SelectCollections from "./select-collections";
import styles from "./style.module.css";
import { Button } from "../ui/button";
import React from "react";
import { ActionState } from "@/actions/import_product";
import editProduct from "@/actions/edit_product";

const RichTextEditor = dynamic(
  () => import("@/components/editor/quill-editor"),
  {
    ssr: false,
  }
);

type RichTextEditorHandle = {
  getContent: () => string;
};

const initialState: ActionState = {
  ok: false,
  error: "",
  data: null,
};

function FormButton({ isPending }: { isPending: boolean }) {
  return (
    <>
      {isPending ? (
        <Button disabled={isPending} className="w-full cursor-pointer">
          Salvando...
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={() => console.log("Clicouu" + isPending)}
          className="w-full cursor-pointer"
        >
          Salvar alterações
        </Button>
      )}
    </>
  );
}

export default function ProductDetail({ id, data }: { id: string; data: any }) {
  const [state, action, isPending] = React.useActionState<
    ActionState,
    FormData
  >(editProduct, initialState);

  const editorRef = React.useRef<RichTextEditorHandle>(null);
  const [editorContent, setEditorContent] = React.useState("");

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent(); // Get the editor content
      setEditorContent(content); // Update the state with the content
    }
  };

  React.useEffect(() => {
    if (data?.scrapper_data["description"]) {
      setEditorContent(data?.scrapper_data["description"]);
    }
  }, [data])

  return (
    <>
      {
        <main className="content mb-8">
          <section className="border p-4 rounded flex gap-2 justify-between items-center mb-8">
            <div className="flex gap-2 items-center">
              <h1 className="font-semibold">{data?.scrapper_data["title"]}</h1>
              <span className="p-1 bg-accent border rounded">
                {data?.product_id}
              </span>
              <span className="p-1 bg-accent border rounded">
                {data?.import_status.toUpperCase()}
              </span>
            </div>

            <div className="flex gap-2">
              <ProductActions productId={id} />
            </div>
          </section>

          <form action={action}>
            <section
              className={`details-content grid grid-cols-[500px_1fr] gap-4`}
            >
              <div
                className={`flex flex-wrap justify-center gap-4 max-h-[600px] overflow-auto border p-4 rounded ${styles["image-container"]}`}
              >
                {data?.scrapper_data["media"].map(
                  (item: any, index: number) => (
                    <Image
                      src={item["url"]}
                      alt={item["alt"]}
                      width={218}
                      height={400}
                      key={index}
                      className="rounded object-cover"
                    />
                  )
                )}
              </div>

              <div className="border p-4 rounded flex flex-col gap-4">
                <h1 className="border rounded p-4">
                  {/* {data?.scrapper_data["title"]} */}
                  <input
                    type="text"
                    name="title"
                    defaultValue={data?.scrapper_data["title"]}
                    className="w-full h-full outline-0"
                  />
                </h1>

                {/* <div className="border rounded p-4 max-h-[700px] overflow-auto">
                  {data?.ai_data ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.ai_data["description"],
                      }}
                    ></div>
                  ) : (
                    <div
                      className="!text-primary"
                      dangerouslySetInnerHTML={{
                        __html: data?.scrapper_data["description_html"],
                      }}
                    ></div>
                  )}
                </div> */}

                <div className="border rounded p-4 max-h-[700px] overflow-auto">
                  <RichTextEditor ref={editorRef} />
                  <button
                    onClick={handleGetContent}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded flex "
                  >
                    Show Content
                  </button>
                  <div className="mt-4">
                    <h2 className="font-bold text-lg">Editor Content:</h2>
                    <div
                      className="border p-4 rounded bg-gray-50"
                      dangerouslySetInnerHTML={{ __html: editorContent }}
                    />
                  </div>
                </div>

                <div className="border rounded p-4">
                  <h1>Opções</h1>
                  <hr className="my-4" />

                  <div className="flex flex-col gap-4">
                    {data?.scrapper_data["options"].map(
                      (item: any, index: number) => (
                        <div key={index} className="container">
                          <div>
                            <header className="flex justify-between">
                              <h2>{item["name"]}</h2>
                              <button>Editar</button>
                            </header>

                            <div className="flex gap-2">
                              {item["values"].map(
                                (option: any, index: number) => (
                                  <div key={index}>
                                    {Object.values(option).map(
                                      (value: any, index: number) => (
                                        <span
                                          key={index}
                                          className="border rounded bg-accent text-primary block p-2"
                                        >
                                          {value}
                                        </span>
                                      )
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <hr
                            className={`my-4 ${
                              index ===
                              data?.scrapper_data["options"].length - 1
                                ? "hidden"
                                : ""
                            }`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="border rounded p-4">
                  <h1>Variantes e Preços</h1>
                  <hr className="my-4" />

                  <div className="flex flex-col gap-4">
                    {data?.scrapper_data["variants"].map(
                      (item: any, index: number) => (
                        <div key={index} className="container">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-3">
                              <Image
                                src={item["image"]}
                                alt={item["sku"]}
                                width={50}
                                height={50}
                                className="rounded object-cover"
                              />
                              <div>
                                <span>
                                  {item["option1"]}{" "}
                                  {`${
                                    item["option2"]
                                      ? "/ " + item["option2"]
                                      : ""
                                  }`}
                                </span>
                                <span className="block">{item["sku"]}</span>
                              </div>
                            </div>

                            <span>R$ {item["price"]}</span>
                          </div>
                          <hr
                            className={`my-4 ${
                              index ===
                              data?.scrapper_data["variants"].length - 1
                                ? "hidden"
                                : ""
                            }`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="border rounded p-4">
                  <h1>Outras opções</h1>
                  <hr className="my-4" />

                  <div className="flex flex-col gap-4">
                    <h1>Collections</h1>

                    <SelectCollections />
                  </div>
                  <hr className="my-4" />

                  <div className="flex flex-col gap-4">
                    <h1>Tags</h1>

                    <SelectCollections />
                  </div>
                </div>
              </div>
            </section>
          </form>
        </main>
      }
    </>
  );
}
