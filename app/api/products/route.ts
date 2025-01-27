
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Methode (GET)  de récupération des produits depuis l'API reqress en utilisant axios
export async function GET(){
    const response = await axios.get("https://reqres.in/api/products");
    return NextResponse.json(response.data)
}
//Methode (POST) d'ajout d'un nouveau produit à l'API reqress en utilisant axios
export async function POST(req: NextRequest){
    try{
        const body = await req.json();
    console.log("Requête réçu depuis L\'API", body);
    const response = await axios.post("https://reqres.in/api/products", body);
    console.log("Reponse de L\'API", response.data);
    return NextResponse.json(response.data);
    } catch(error){
        console.error("Erreur lors de l'ajout du produit :", error);
        return NextResponse.json({error: "Erreur lors de l'ajout du produit", details: error.message}, {status: 500});
    }
}
//Methode (PUT) de modification d'un produit à l'API reqress en utilisant axios
export async function PUT (req: NextRequest){
    const {searchParams} = new URL (req.url);
    const id = await searchParams.get('id');
    const body = await req.json();
    const response = await axios.put(`https://reqres.in/api/products/${id}`, body);
    return NextResponse.json(response.data);
}

//Method (DELETE) de suppression d'un produit à l'API reqress en utilisant axios
export async function DELETE (req: NextRequest){
    const {searchParams} = new URL (req.url);
    const id = await searchParams.get('id');
    const body = await req.json();
    const response = await axios.delete(`https://reqres.in/api/products/${id}`, body);
    return NextResponse.json(response.data);
}