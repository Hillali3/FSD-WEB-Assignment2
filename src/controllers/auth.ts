import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    console.log("login")
    return res.status(400).send({ 
        'status': 'fail',
        'message': 'not implemented'
    });
};

export const register = async (req: Request, res: Response)  => {
    console.log("register")
    return res.status(400).send({ 
        'status': 'fail',
        'message': 'not implemented'
    });
};

export const logout = async (req: Request, res: Response)  => {
    console.log("logout")
    return res.status(400).send({ 
        'status': 'fail',
        'message': 'not implemented'
    });
};