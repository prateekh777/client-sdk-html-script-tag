import Vapi from "@vapi-ai/web";
import defaultAssistant from "./assistant";
import { createButtonElement, createButtonStateHandler } from "./button";
import { defaultListeners } from "./listeners";

const runSDK = ({
  apiKey = "",
  assistant = defaultAssistant(),

  config = {
    position: "bottom",
    offset: "40px",
    width: "50px",
    height: "50px",
    idle: {
      color: `rgb(93, 254, 202)`,
      type: "round",
      title: "Have a quick question?",
      subtitle: "Talk with our AI assistant",
      icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone.svg`,
    },
    loading: {
      color: `rgb(93, 124, 202)`,
      type: "round",
      title: "Connecting...",
      subtitle: "Please wait",
      icon: `https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg`,
    },
    active: {
      color: `rgb(255, 0, 0)`,
      type: "round",
      title: "Call is in progress...",
      subtitle: "End the call.",
      icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg`,
    },
  },
  // position = "bottom",
  // color = `rgb(93, 254, 202)`,
  // offset = "40px",
}) => {
  if (apiKey && assistant) {
    const vapi = new Vapi(apiKey);
    const buttonElement = createButtonElement(config);

    const buttonStateHandler = createButtonStateHandler(config);
    document.body.appendChild(buttonElement);

    buttonStateHandler(buttonElement, "idle");
    defaultListeners(vapi, buttonElement, assistant, buttonStateHandler);
  } else {
    console.error(
      "API Key and Assistant Configurations are required. are required"
    );
  }
};

window.vapiSDK = {
  run: runSDK,
};
