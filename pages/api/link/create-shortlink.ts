import {NextApiResponse, NextApiRequest} from 'next'
import { prisma } from "../../../src/db/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {url, shortCode} = req.body;
    if (typeof url !== 'string' && typeof shortCode !== 'string') {
        return res.status(400).json({message: "Inserted values are incorrect, must be string"})
    }
    const checkIfExists = await prisma.shortLink.findUnique({
        where: {
            shortCode: shortCode
        }
    })
    if (checkIfExists) {
        return res.status(400).json({message: "Short code already exists"})
    }
    const createdLink = await prisma.shortLink.create({
        data: {
            url,
            shortCode
        }
    })
    return res.status(200).json({data: createdLink})
}