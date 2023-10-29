"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const common_1 = require("@nestjs/common");
const fileFilter = (req, file, callback) => {
    if (!file)
        return callback(new Error(`File doesn't exist !!!!!`), false);
    const fileExtension = file.mimetype.split('/')[1];
    const validExtension = ['jpg', 'jpeg', 'png'];
    if (!validExtension.includes(fileExtension))
        return callback(new common_1.BadRequestException('Invalid image extension !!!'), false);
    return callback(null, true);
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=file-filter.helper.js.map