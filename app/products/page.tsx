"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/models/Product";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductService } from "@/lib/services/product.service";
import { Button } from "@/components/ui/button";
import { Edit2Icon, EyeIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApiResponse } from "@/models/ApiResponse";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    const data: ApiResponse = await ProductService.fetchProducts(page, 5);
    setProducts(data.data);
    setTotal(data.total_pages);
  };

  const handleNextPage = () => {
    if (page === total) return;
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [loading, page]);

  return (
    <div className="flex flex-col w-full mx-auto bg-background p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold my-12">Liste des produits ({total})</h1>
      <Table>
        <TableCaption>
          A liste de tous les produits depuis l&apos;API Reqres
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Prix</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {product.description ?? product.pantone_value}
                </TableCell>
                <TableCell className="text-right">
                  $ {(product.price ?? product.year)?.toFixed(2)}
                </TableCell>
                <TableCell className="text-right flex gap-2 items-center justify-end">
                  <EyeIcon className="size-3 text-green-700" />
                  <Edit2Icon className="size-3 text-blue-600" />
                  <Trash2Icon className="size-3 text-red-600" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Aucun produit trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                      onClick={handlePrevPage}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink className="font-bold text-gray-800 border border-gray-300">
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      className={cn(
                        total === page ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                      onClick={handleNextPage}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductsPage;
