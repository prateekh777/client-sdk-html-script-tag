export function defaultListeners(vapi, button, assistant, buttonStateHandler) {
  let isActiveCall = false;
  let isLoading = false;

  console.log("buttonStateHanlder", buttonStateHandler);

  const toggleCall = () => {
    isLoading = true;
    buttonStateHandler(button, "loading");
    if (isActiveCall) {
      vapi.stop();
      isActiveCall = false;
    } else {
      vapi.start(assistant);
      isActiveCall = true;
    }
  };

  vapi.on("call-start", () => {
    buttonStateHandler(button, "active");
  });

  vapi.on("call-end", () => {
    buttonStateHandler(button, "idle");
  });

  vapi.on("speech-start", () => {
    button.classList.add("vapi-btn-is-speaking");
  });

  vapi.on("speech-end", () => {
    button.classList.remove("vapi-btn-is-speaking");
  });

  button.addEventListener("click", toggleCall);
  vapi.on("volume-level", (audioLevel) => {
    const volume = Math.floor(audioLevel * 10);
    for (let i = 0; i <= 10; i++) {
      button.classList.remove(`vapi-btn-volume-${i}`);
    }
    button.classList.add(`vapi-btn-volume-${volume}`);
  });
}
