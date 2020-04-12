import { SwaggerSchema, Schema } from "../models/SwaggerSchema";
import { render } from "mustache";

const renderProperties = (swagger: SwaggerSchema) => (
  schemaName: string,
  schema: Schema
): string => {
  if (schema.type === "object" && schema.properties) {
    const properties = Object.keys(schema.properties)
      .map((op) => {
        const childProp = (schema.properties as any)[op] as Schema;
        const view = {
          name: op,
          type: renderProperties(swagger)(op, childProp),
        };
        return render("{{ name }}: {{ type }};", view);
      })
      .join("\n\t");
    return properties;
  } else if (schema.enum) {
    return schema.enum.map((e) => e).join(" | ");
  } else if (schema.allOf) {
    if (schema.allOf[0].enum) {
      return schema.allOf[0].enum.map((e) => e).join(" | ");
    }
    if (schema.allOf[0].type === "object") {
      return "any";
    }
    return "any";
  } else {
    switch (schema.type) {
      case "integer":
        return "number";
      case "object":
        return "{}";
      case "array":
        return "[]";
      default:
        return (schema.type || schema.allOf) as string;
    }
  }
};

export const generateContracts = (swaggerSchema: SwaggerSchema) => {
  const rp = renderProperties(swaggerSchema);

  const rows = Object.keys(swaggerSchema.components.schemas)
    .map((k) => {
      const o = swaggerSchema.components.schemas[k];

      const view = {
        name: k,
        properties: rp(k, o),
      };
      if (o.type === "object") {
        return render(`interface {{ name }} {\n\t{{ properties }}\n}\n`, view);
      }
      return render(`const {{ name }} = {{ properties }};\n`, view);
    })
    .join("\n");

  return render("{{{ rows }}}", { rows });
};
