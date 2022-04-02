import config from "../../../config.json";

type MessageLogType = "debug" | "info" | "warn" | "error";

const logLevel = config.log_level;

const emitLogMessage = (
  messageType: MessageLogType,
  message: string,
  supportingDetails: any[]
) => {
  if (supportingDetails.length > 0)
    console[messageType](message, supportingDetails);
  else console[messageType](message);
};

export const debug = (message: string, ...supportingDetails: any[]) => {
  if (logLevel === "none") return;
  if (logLevel !== "debug") return;
  emitLogMessage("debug", message, supportingDetails);
};

export const info = (message: string, ...supportingDetails: any[]) => {
  if (logLevel === "none") return;
  if (logLevel !== "debug" && logLevel !== "info") return;
  emitLogMessage("info", message, supportingDetails);
};

export const warn = (message: string, ...supportingDetails: any[]) => {
  if (logLevel === "none") return;
  if (logLevel !== "debug" && logLevel !== "info" && logLevel !== "warn")
    return;
  emitLogMessage("warn", message, supportingDetails);
};

export const error = (message: string, ...supportingDetails: any[]) => {
  if (logLevel === "none") return;
  emitLogMessage("error", message, supportingDetails);
};
