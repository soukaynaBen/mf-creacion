import { client } from "@/sanity/lib/client"
import { validatePreviewUrl } from "@sanity/preview-url-secret"
import { redirect } from "next/navigation"
import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest) {
 
     (await draftMode()).disable();
  
    return NextResponse.redirect( new URL("/", request.url))
}