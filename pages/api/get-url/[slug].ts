/* eslint-disable import/no-anonymous-default-export */
import {NextApiRequest, NextApiResponse} from 'next'

import { prisma } from '../../../src/db/prisma'

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query["slug"]
    if (slug && typeof slug !== "string") {
        res.statusCode = 404;
        res.send(JSON.stringify({message: "Slug must be a string"}))
        return;
    }


    const data = await prisma.shortLink.findFirst({
        where: {
            shortCode: {
                equals: slug
            }
        }
    })
    if (!data) {
        res.statusCode = 404;
        res.send(JSON.stringify({message: "Slug not found"}))
        return;
    }

    res.setHeader("Content-type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Cache-Control", "s-maxage=100000000, stale-while-revalidate")
    
    return res.json(data);
}