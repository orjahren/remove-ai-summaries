const extensionName = window.AI_EXTERMINATOR_NAME;

const formatHostName = (host) =>
  // TODO: Not every host should be capitalized like this, but for now it works
  // TODO: Keep in mind that this assumes all TLDs to be .no
  host.replace("www.", "").replace(".no", "").toUpperCase();

const hostUrlToLi = (host) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = formatHostName(host);
  a.href = `https://${host}`;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  li.appendChild(a);
  return li;
};

document.addEventListener("DOMContentLoaded", () => {
  const supportedHosts = window.SUPPORTED_HOSTS;
  const ul = document.querySelector("#supported-sites");
  ul.innerHTML = "";
  supportedHosts.forEach((host) => {
    ul.appendChild(hostUrlToLi(host));
  });
  // set name of the extension in the header
  const header = document.querySelector("#popupH1");
  header.textContent = extensionName;
  document.body.style.background = "#ffeeba"; // Makes the popup background yellow to confirm it's loaded
});
