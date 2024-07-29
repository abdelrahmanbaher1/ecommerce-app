import React, { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import useAppContext from "@/contexts/AppContext";
import { TCartItem } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";

type TProps = {
  btnClassName?: string;
  product: TCartItem;
  disabled?: boolean;
};

const AddToCartBtn = forwardRef<HTMLButtonElement, TProps>(
  ({ btnClassName = "", product, disabled = false }, ref) => {
    const { addToCart } = useAppContext();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
      setLoading(true);

      setTimeout(() => {
        addToCart(product);
        toast({
          title: "Item Has Been Added Successfully To The Cart",
          duration: 1000,
        });
        setLoading(false);
      }, 1500);
    };

    return (
      <Button
        className={clsx(btnClassName, "hover:scale-110", {
          "opacity-50 cursor-not-allowed": loading,
        })}
        onClick={handleClick}
        disabled={loading || disabled}
        ref={ref}
      >
        {loading && (
          <svg
            className={clsx("h-5 w-5 mr-3", {
              "animate-spin": loading,
            })}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,4V1L8,5l4,4V6c3.31,0,6,2.69,6,6s-2.69,6-6,6-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,4,12,4z"
            />
          </svg>
        )}
        <span>{loading ? "Adding..." : "Add To Cart"}</span>
      </Button>
    );
  }
);

export default React.memo(AddToCartBtn);
