"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const schema = yup.object().shape({
    id: yup.number(),
    name: yup.string().required(),
    value: yup.string().required(),
});
exports.validateItem = (obj) => schema.validate(obj);
