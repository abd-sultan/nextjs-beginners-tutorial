import axios from "axios";
import { NextResponse } from "next/server";

// Methode (GET)  de récupération des produits depuis l'API reqress en utilisant axios
export async function GET(){
    const response = await axios.get("https://reqres.in/api/products");
    return NextResponse.json(response.data)
}