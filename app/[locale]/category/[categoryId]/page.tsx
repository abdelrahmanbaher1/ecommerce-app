"use client";

import Filters from "@/components/common/Filters/Filters";
import ProductBox from "@/components/productBox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getMaxAndMinPrice } from "@/lib/helpers/generic";
import { TProduct } from "@/lib/types";
import { getCategoryProducts } from "@/services/ProductService";

type TProps = {
  params: { categoryId: string };
};

const page = async ({ params }: TProps) => {
  const { categoryId } = params;
  const [categoryName, category_id] = categoryId.split("-");

  const categoryProducts = await getCategoryProducts(+category_id);
  const [maxPrice, minPrice] = await getMaxAndMinPrice(categoryProducts);

  return (
    <main className="p-5">
      <Breadcrumb>
        <BreadcrumbList className="text-2xl">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{categoryName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="mt-2 flex gap-3">
        <Card className="hidden md:flex flex-col md:w-1/4 h-auto p-2 bg-transparents">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription className="pl-2">Filter By</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="font-bold mb-1">Price - From</p>
            <Filters
              filterType="select"
              placeholder="Select a Price"
              filterLabel="Prices"
              options={categoryProducts.map((product) => ({
                id: product.id,
                option: String(product.price),
              }))}
            />
            {/* images=
            {product.images.map((image: Image) => ({
              src: image.url,
              altText: image.altText,
            }))} */}
          </CardContent>
        </Card>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {categoryProducts.map((product: TProduct) => (
            <li key={product.id} className="w-full">
              <ProductBox product={product} variant="full" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default page;
