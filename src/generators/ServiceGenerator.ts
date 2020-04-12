import { SwaggerSchema } from "../models/SwaggerSchema";
import {
  getEndpointsDescriptions,
  EndpointDescription,
} from "./ApiDescriptionGenerator";
import { render } from "mustache";
import { Maybe, Nothing, Just } from "purify-ts";

const getRequestContractType = (
  endpointDescription: EndpointDescription
): Maybe<{ contractParameterName: string; formattedParam: string }> => {
  const post = endpointDescription.pathObject.post;
  if (post && post.requestBody?.content["application/json"]) {
    const ref = post.requestBody.content["application/json"].schema;
    return Maybe.fromNullable(ref.$ref?.split("/").reverse()[0]).chain((v) =>
      Just({
        contractParameterName: "requestContract",
        formattedParam: `requestContract: ${v}`,
      })
    );
  }
  return Nothing;
};

const getContractResult = (
  endpointDescription: EndpointDescription
): Maybe<string> => {
  const post = endpointDescription.pathObject.post;
  if (post && post.responses["200"]?.content?.["application/json"]) {
    const ref = post.responses["200"].content["application/json"].schema;
    return Maybe.fromNullable(ref.$ref?.split("/").reverse()[0]) as Maybe<
      string
    >;
  }
  return Nothing;
};

export const generateServices = (swagger: SwaggerSchema) => {
  const endpoints = getEndpointsDescriptions(swagger);
  const view = endpoints
    .map((e) => {
      const { formattedParam, contractParameterName } = getRequestContractType(
        e
      ).orDefault({
        contractParameterName: "{}",
        formattedParam: "",
      });
      const contractResult = getContractResult(e).orDefault("any");
      const view = {
        name: e.name,
        formattedParam,
        contractParameterName,
        contractResult,
      };

      return render(
        "export const {{name}} = ({{formattedParam}}): Promise<FetchResponse<{{contractResult}}>> => apiPost('', {{contractParameterName}});",
        view
      );
    })
    .join("\n");

  return view;
};
