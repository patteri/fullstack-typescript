"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.schema = yup.object().shape({
    id: yup.number(),
    name: yup.string().required('Required'),
    value: yup.string().required('Required'),
});
exports.validateItem = (obj) => exports.schema.validate(obj);
