import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    console.log("login")
    return res.status(400).send({ 
        'status': 'fail',
        'message': 'not implemented'
    });
};

const register = async (req: Request, res: Response)  => {
    console.log("register")
    return res.status(400).send({ 
        'status': 'fail',
        'message': 'not implemented'
    });
};

const logout = async (req: Request, res: Response)  => {
    console.log("logout")
    return res.status(400).send({ 
        'status': 'fail',
        'message': 'not implemented'
    });
};