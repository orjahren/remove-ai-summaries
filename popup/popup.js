const extensionName = window.AI_EXTERMINATOR_NAME;
document.addEventListener("DOMContentLoaded", () => {
  const supportedHosts = window.SUPPORTED_HOSTS || [];
  console.log(`[${extensionName}] Supported hosts:`, supportedHosts);
  const ul = document.querySelector("#supported-sites");
  ul.innerHTML = "";
  supportedHosts.forEach((host) => {
    const li = document.createElement("li");
    li.textContent = host.replace("www.", "").replace(".no", "").toUpperCase();
    ul.appendChild(li);
  });
  document.body.style.background = "#ffeeba"; // Makes the popup background yellow to confirm it's loaded
});
console.log(`[${extensionName}] User opened popup.`);
