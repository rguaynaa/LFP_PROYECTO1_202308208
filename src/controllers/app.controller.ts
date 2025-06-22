import { Request, Response } from 'express';
import { LexicalAnalize } from '../Lexer/LexicalAnalize';
import { Career } from '../models/career';
import { getCareers } from '../utils/StructureCareer';


export const home=(req:Request,res:Response)=>{
    res.render('pages/index');
}
export const analyze=(req:Request,res:Response)=>{
    const body=req.body;
    

    let scanner: LexicalAnalize = new LexicalAnalize();
    
    scanner.scanner(body);
    
    let careers: Career[] = [];

    if (scanner.getErrorList().length==0) {
        careers =getCareers(scanner.getTokensList());


    }


    res.json({
        "tokens": scanner.getTokensList(),
        "errors": scanner.getErrorList(),
       "editor":scanner.getColors(),
        "careers": careers
    });

}

export const pensum=(req:Request,res:Response)=>{
     const id = req.params.id;

     console.log(id);

     res.render('pages/carrera',{id});
}
export const errorReport = (req: Request, res: Response) => {
    res.render('pages/error_report');
}
