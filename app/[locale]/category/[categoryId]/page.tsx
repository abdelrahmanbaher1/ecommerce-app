import ErrorView from "@/components/common/ErrorView";
import Filters from "@/components/common/Filters/Filters";
import ProductBox from "@/components/Product/ProductBox/ProductBox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRODUCT_BOX_VARIANT } from "@/lib/helpers/constants";

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

  if (categoryProducts.length === 0) return <ErrorView />;

  const renderBreadCrumb = () => (
    <Breadcrumb className="mt-5">
      <BreadcrumbList className="text-2xl">
        <BreadcrumbLink href="/" key={Math.random()}>
          Home
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{categoryName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <main className="p-5">
      {renderBreadCrumb()}
      <section className="mt-2 flex gap-3">
        {/* Filters Section */}
        <Card className="hidden lg:flex flex-col md:w-1/4 h-auto p-2 bg-transparent">
          <CardDescription className="text-center">
            {" "}
            @TODO : This is on progress{" "}
          </CardDescription>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-bold mb-1 text-gray-700 text-center">
              Min: {minPrice} --- Max :{maxPrice}
            </p>
            <div className="flex flex-col gap-4">
              From
              <Filters
                filterType="select"
                options={categoryProducts.map((product) => ({
                  id: product.id,
                  option: String(product.price),
                }))}
              />
              To
              <Filters
                filterType="select"
                options={categoryProducts.map((product) => ({
                  id: product.id,
                  option: String(product.price),
                }))}
              />
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {categoryProducts.map((product: TProduct) => (
            <li key={product.id} className="w-full">
              <ProductBox
                product={product}
                variant={PRODUCT_BOX_VARIANT.FULL}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default page;
