import {NextApiResponse, NextApiRequest} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    return res.status(200).json({message: "Deu certo mano"})
}