import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { pesan } from "@prisma/client";
import jsontrue from "../../../lib/jsontrue";
import jsonfalse from "../../../lib/jsonfalse";
import email from "../../../lib/email";
import Help from "../../../lib/mail/Help";
import * as ReactDOMServer from 'react-dom/server';

async function getHelp(res: NextApiResponse){
    let pesan:pesan[]
    try {
        pesan=await prisma.pesan.findMany()
        res.status(200).json(jsontrue("Data query successful",pesan))
    } catch (error) {
        res.status(500).json(jsonfalse("server is unable to process request",error))
    }
}

async function postHelp(req: NextApiRequest,res: NextApiResponse){
    const body=req.body
    if(body.email!=null && body.pesan!=null){
        try {
            let result = await prisma.pesan.create({
                data:{
                    email:body.email,
                    pesan:body.pesan
                }
            })
            email(body.email,"Pertanyaan kepada Lab Jaringan Berbasis Informasi","",ReactDOMServer.renderToStaticMarkup(Help(body))).catch(console.error);
            res.status(200).json(jsontrue("Data added succesfully",result))
        } catch (error) {
            res.status(500).json(jsonfalse("Server is unable to process request",error))
        }
    }else res.status(400).json(jsonfalse("Data is not complete","Object is possibly has 'null' values"))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            getHelp(res)
            break
        case 'POST':
            postHelp(req,res)
            break
        default:
            res.status(200).json(jsontrue("Welcome to Infomation Based Networking Lab's Help API!",null))
            break
    }
}