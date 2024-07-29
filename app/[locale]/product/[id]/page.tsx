"use client";

import React, { Suspense, useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductDetails } from "@/services/ProductService";
import { Gallery } from "@/components/Product/Gallery";
import RelatedProductsCarousel from "@/components/Modules/RelatedProductsCarousel";
import { ERRORVIEW, REACT_QUERY_KEYS } from "@/lib/helpers/constants";
import { useQuery } from "@tanstack/react-query";
import { TProduct } from "@/lib/types";
import clsx from "clsx";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import Link from "next/link";
import Skeleton from "@/components/common/Loaders/Skeleton";
import ProductPrice from "@/components/Product/Common/ProductPrice";
import ProductVariants from "@/components/Product/Common/ProductVariants";
import AddToCartBtn from "@/components/common/Buttons/AddToCartBtn";
import ErrorView from "@/components/common/ErrorView";

type TProps = {
  params: { id: string };
};

const page = ({ params }: TProps) => {
  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery<TProduct>({
    queryKey: [REACT_QUERY_KEYS.GET_PRODDUCT_DETAILS, params.id],
    queryFn: () => getProductDetails(+params.id),
  });

  const [variantSelected, setVariantSelected] = useState<string | null>(null);
  const ref = useRef(null);
  const handleVariantClick = (variant: string) => {
    setVariantSelected(variant);
  };

  useOutsideClick({
    callback: () => {
      setVariantSelected(null);
    },
    ref,
  });

  if (isLoading)
    return (
      <div className="mx-auto max-w-screen-2xl px-4 mt-5">
        <div className="w-full h-3/4 flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="w-full h-lvh flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
            {new Array(2).fill(null).map((_, idx) => (
              <React.Fragment key={idx}>
                <Skeleton fullWidth />
                <Skeleton renderTitleSkeleton fullWidth />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );

  if (isError) return <ErrorView type={ERRORVIEW.GENERIC_ERROR} />;
  if (!productDetail) return null;

  const { category, description, title, images } = productDetail;

  const renderBreadCrumb = () => (
    <Breadcrumb className="mb-5 ml-5 mt-4">
      <BreadcrumbList className="text-xl">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbLink href={`/category/${category.name}-${category.id}`}>
          {category.name}
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{params.id}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
  const renderTabs = () => (
    <Tabs defaultValue="Description">
      <TabsList className="dark:bg-white ">
        <TabsTrigger value="Description">Description</TabsTrigger>
        <TabsTrigger value="relatedProducts">Related Products</TabsTrigger>
      </TabsList>
      <TabsContent value="Description" className="p-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          {description}
        </p>
      </TabsContent>
      <TabsContent value="relatedProducts" className="max-w-[400px]">
        <RelatedProductsCarousel categoryId={+category.id} fullSize />
      </TabsContent>
    </Tabs>
  );

  const renderProductTitleAndDescription = () => (
    <>
      <span className="text-xl font-bold">{title}</span>
      <div className="flex items-center justify-between gap-2 mt-4">
        <Link
          href={`/category/${category.name}-${category.id}`}
          className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700"
        >
          {category.name}
        </Link>
      </div>
    </>
  );

  const renderProductImages = () => (
    <Suspense
      fallback={
        <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
      }
    >
      <Gallery
        images={images.map((image) => ({
          src: image,
          altText: title,
        }))}
      />
    </Suspense>
  );

  return (
    <section aria-label="product details" className="mb-10">
      {renderBreadCrumb()}
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full  basis-full lg:basis-4/6">
            {renderProductImages()}
          </div>

          <div className="w-full mt-2 lg:basis-2/6 ">
            <div className="flex flex-col gap-1  mb-2">
              {renderProductTitleAndDescription()}

              <ProductPrice
                price={productDetail?.price}
                originalPrice={productDetail?.price + 100}
                discountTag="Save 20%"
              />
              <ProductVariants
                onClick={handleVariantClick}
                variantSelected={variantSelected}
              />
              <AddToCartBtn
                btnClassName={clsx("mt-4 w-full", {
                  "cursor-not-allowed": !variantSelected,
                })}
                disabled={!variantSelected}
                product={{
                  ...productDetail,
                  quantity: 1,
                  variant: variantSelected as string,
                }}
                ref={ref}
              />
            </div>

            {renderTabs()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
