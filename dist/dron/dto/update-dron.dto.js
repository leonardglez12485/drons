"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDronDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_dron_dto_1 = require("./create-dron.dto");
class UpdateDronDto extends (0, mapped_types_1.PartialType)(create_dron_dto_1.CreateDronDto) {
}
exports.UpdateDronDto = UpdateDronDto;
//# sourceMappingURL=update-dron.dto.js.map