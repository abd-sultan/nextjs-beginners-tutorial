import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(){
    const response = await axios.get("https://reqres.in/api/products");
    return NextResponse.json(response.data)
}