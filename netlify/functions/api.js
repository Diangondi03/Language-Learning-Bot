import serverless from "serverless-http";
import app from "../../backend/server";

exports.handler = serverless(app)