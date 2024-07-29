import { TProduct } from "@/lib/types";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ProductBox from "../Product/ProductBox/ProductBox";
import { PRODUCT_BOX_VARIANT } from "@/lib/helpers/constants";
import useAppContext from "@/contexts/AppContext";

type TProps = {
  products: TProduct[];
};

const ProductCarouselWithControls = ({ products }: TProps) => {
  const { isMobile } = useAppContext();

  const itemsPerPage = isMobile ? 1 : 5;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="py-8 mb-10 mx-auto w-full pl-10 pr-10">
      <h2 className="mb-4 text-2xl font-bold flex justify-between">
        Explore Products
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="p-1 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
            disabled={currentPage === 0} // Disable if on the first page
          >
            <ArrowLeftIcon width={20} height={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
            disabled={currentPage === totalPages - 1} // Disable if on the last page
          >
            <ArrowRightIcon width={20} height={20} />
          </button>
        </div>
      </h2>
      <ul className="flex gap-3 overflow-hidden snap-proximity snap-x scrollbar-thin scrollbar-thumb-gray-400">
        {currentProducts.map((product) => (
          <li key={product.id} className="snap-center w-full">
            <ProductBox
              product={product}
              variant={PRODUCT_BOX_VARIANT.CAROUSEL}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCarouselWithControls;
