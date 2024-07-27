import { TCategory } from "@/lib/types";
import CategoryContent from "./CategoryContent";

type TProps = {
  categories: TCategory[];
  isLoading: boolean;
};

const CategoryCarouselModule = ({ categories, isLoading }: TProps) => {
  const skeleton =
    "w-24 h-24 sm:w-36 sm:h-36 md:w-52 md:h-52 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center";
  const titleSkeleton =
    "w-20 h-4 sm:w-32 sm:h-5 md:w-40 md:h-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700";

  if (isLoading) {
    return (
      <>
        <div className={titleSkeleton} />
        <div className="grid gap-10 w-full grid-cols-3 md:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div
              className="flex flex-col gap-5 items-center"
              key={`Skeleton-${index}`}
            >
              <div className={skeleton} />
              <div className={titleSkeleton}></div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-5 mb-10">
      <h2 className="lg:text-3xl pl-4 sm:text-xl ">Explore Categories</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
        {categories.map((category) => (
          <CategoryContent category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarouselModule;
