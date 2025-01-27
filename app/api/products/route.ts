import axios from "axios";
import { NextApiRequest } from "next";
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