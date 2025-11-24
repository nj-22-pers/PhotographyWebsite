import { type SchemaTypeDefinition } from "sanity";

import { aboutType } from "./schemaTypes/aboutType";
import { categoryType } from "./schemaTypes/categoryType";
import contactMessage from "./schemaTypes/contactMessage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    aboutType,
    categoryType,
    contactMessage,   // ← ADDED HERE
  ],
};
