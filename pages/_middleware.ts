/* eslint-disable import/no-anonymous-default-export */
import {NextRequest, NextFetchEvent, NextResponse} from 'next/server'

export async function middleware(req: NextRequest, _ev: NextFetchEvent) {
    console.log(`whats is this ${req.nextUrl} ${req.nextUrl.pathname.split("/").pop()}`)
    if (!req.nextUrl.pathname.startsWith('/api/get-url')) {
        return;
    }

    const slug = req.nextUrl.pathname.split("/").pop();
    console.log('slug', slug)
    const fetchSlug = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
    if (fetchSlug.status === 404) {
        return NextResponse.redirect(req.nextUrl.origin)
    }
    const data = await fetchSlug.json();
    console.log('middleware data', data)
    if (data?.shortCode) {
        return NextResponse.redirect(data.shortCode)
    }
}   