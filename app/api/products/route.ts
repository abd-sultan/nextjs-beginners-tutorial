import {  NextResponse } from "next/server";

export async function GET (){
    return NextResponse.json({

         product: [
            {
                id: 1,
                name: "Produit 1",
                price: 10,
                description: "Description du produit 1"
            },
         ]
        
        
        }); 
    
}
export async function POST(request: Request){
    const data = await request.json();
    return NextResponse.json({
        data
    });
    
}