"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateRangeByCustomDates = void 0;
const date_fns_1 = require("date-fns");
const dateRangeByCustomDates = (startDate, endDate) => {
    const StartDate = new Date(startDate);
    const EndDate = new Date(endDate);
    const start = (0, date_fns_1.startOfDay)(StartDate);
    const end = (0, date_fns_1.endOfDay)(EndDate);
    return {
        start,
        end
    };
};
exports.dateRangeByCustomDates = dateRangeByCustomDates;
//# sourceMappingURL=time-helper.js.map