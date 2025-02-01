import { ApiResponse } from "@/models/ApiResponse";

const ITEMS_PER_PAGE = 10;

export class ProductService {
  public static async getProducts(page: number): Promise<ApiResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&per_page=${ITEMS_PER_PAGE}`
    );
    const data = await response.json();
    console.log("🚀 ~ ProductService ~ getProducts ~ response:", data);
    return data;
  }

  public static async fetchProducts(
    page: number,
    size: number = 10
  ): Promise<ApiResponse> {
    const response = await fetch(`/api/products?page=${page}&size=${size}`);
    const data = await response.json();
    console.log("🚀 ~ ProductService ~ getProducts ~ response:", data);
    return data;
  }
}
