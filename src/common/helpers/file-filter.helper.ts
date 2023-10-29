import { BadRequestException } from "@nestjs/common";

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) =>{

    if(!file) return callback(new Error(`File doesn't exist !!!!!`), false);

    const fileExtension = file.mimetype.split('/')[1];
    const validExtension = ['jpg', 'jpeg', 'png']
    if (!validExtension.includes(fileExtension)) return callback( new BadRequestException('Invalid image extension !!!'), false);
    return callback(null, true);
}
