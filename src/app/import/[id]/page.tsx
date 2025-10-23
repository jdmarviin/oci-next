/* eslint-disable @typescript-eslint/no-explicit-any */

import getProduct from "@/actions/get_product"
import Image from "next/image"
import { notFound } from "next/navigation"
import styles from './style.module.css'

type Params = {
    params: {
        id: string
    }
}

export default async function ImportProductDetailPage({ params: { id } }: Params) {
    const { data, error } = await getProduct(id)

    if (error) return notFound();

    return <main className="content mb-8">
        <section className="border p-4 rounded flex gap-2 items-center mb-8">
            <h1 className="font-semibold">{data?.scrapper_data['title']}</h1>
            <span className="p-1 bg-accent border rounded">{ data?.product_id }</span>
            <span className="p-1 bg-accent border rounded">{ data?.import_status.toUpperCase() }</span>
        </section>

        <section className={`details-content grid grid-cols-[500px_1fr] gap-4`}>
            <div className={`flex flex-wrap justify-center gap-4 max-h-[600px] overflow-auto border p-4 rounded ${styles['image-container']}`}>
                {
                    data?.scrapper_data['media'].map((item: any, index: number) => (
                        <Image src={item['url']} alt={item['alt']} width={218} height={400} key={index} className="rounded object-cover" />
                    ))
                }
            </div>

            <div className="border p-4 rounded flex flex-col gap-4">
                <h1 className="border rounded p-4">{data?.scrapper_data['title']}</h1>

                <div className="border rounded p-4 max-h-[700px] overflow-auto" dangerouslySetInnerHTML={{ __html: data?.scrapper_data['description_html'] }}></div>

                <div className="border rounded p-4">
                    <h1>Opções</h1>
                    <hr className="my-4"/>

                    <div className="flex flex-col gap-4">
                        {
                            data?.scrapper_data['options'].map((item: any, index: number) => (
                                <div key={index} className="container">
                                    <div>
                                        <header className="flex justify-between">
                                            <h2>{item['name']}</h2>
                                            <button>Editar</button>
                                        </header>

                                        <div className="flex gap-2">
                                            {
                                                item['values'].map((option: any, index: number) => (
                                                    <div key={index}>
                                                        {Object.values(option).map((value: any, index: number) => (
                                                            <span key={index} className="border rounded bg-accent text-primary block p-2">{value}</span>
                                                        ))}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <hr className={`my-4 ${index === data?.scrapper_data['options'].length - 1 ? 'hidden' : ''}`}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div className="border rounded p-4">
                    <h1>Variantes e Preços</h1>
                    <hr className="my-4"/>

                    <div className="flex flex-col gap-4">
                        {
                            data?.scrapper_data['variants'].map((item: any, index: number) => (
                                <div key={index} className="container">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <Image src={item['image']} alt={item['sku']} width={50} height={50} className="rounded object-cover"/>
                                            <div>
                                                <span>{item['option1']} {`${item['option2'] ? '/ ' + item['option2'] : ''}`}</span>
                                                <span className="block">{item['sku']}</span>
                                            </div>
                                        </div>

                                        <span>$ {item['price']}</span>
                                    </div>
                                    <hr className={`my-4 ${index === data?.scrapper_data['variants'].length - 1 ? 'hidden' : ''}`}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div className="border rounded p-4">
                    <h1>Outras opções</h1>
                    <hr className="my-4"/>

                    <div className="flex flex-col gap-4">
                    </div>
                </div>
            </div>
        </section>
    </main>
}