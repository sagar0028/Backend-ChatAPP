import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { NextFunction } from 'express';
config();

const privateKey = process.env.JWT_PRIVATE_KEY as string;
const publicKey = process.env.JWT_PUBLIC_KEY as string;

interface UserPayload {
    email: string;
    password: string;
}


export const generateToken = (email: string, password: string): string => {
    const payload: UserPayload = { email, password };
    return jwt.sign( payload,'jwtToken', { expiresIn: '70h' });

};

export const verifyToken = (token: string): boolean => {
    try {
        jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return true;
    } catch (err) {
        console.error('Token verification failed:', err);
        return false;
    }
};
export const checkToken = async(req:Request, res:Response, next:NextFunction) => {
    //@ts-ignore
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        if (token == null) {
            //@ts-ignore
            res.status(401).send({ "status": false });
        } else {
            jwt.verify(token, 'jwtToken', function(err:any, validity:any) {
                if (!err) {
                    next();
                } else {
                    console.log(err)
                    //@ts-ignore
                    res.status(401).send({ "status": false, "authorization": "failed" });
                }
            })
        }
    } else {
        //@ts-ignore
        res.sendStatus(403);
    };
}
