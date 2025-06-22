const PROBABLY_AI_CLASS_NAMES = [
  "fact-reference", // NRK
  "_summary_1flq1_1", // VG uses compile time genearted class names. Not Nice.
  "factbox", // Dagbladet (why am i doing this?)
];

const PROBABLY_AI_KEYWORDS = [
  "Sammendrag", // NRK
  "Kortversjonen", // VG
  "Saken oppsummert",
  "Kort fortalt", // Dagbladet
];

// Use window to make it available globally
const supportedHosts = window.SUPPORTED_HOSTS;
const extensionName = window.AI_EXTERMINATOR_NAME;

// TODO: Handle this case along with the rest of the logic
const handleVg = () => {
  console.info(`[${extensionName}] Handling VG specific logic...`);
  const astroIslands = document.querySelectorAll("astro-island");

  const summaryElt = Array.from(astroIslands).find((elt) =>
    Array.from(elt.children).find((child) =>
      child.className.includes("summary")
    )
  );

  if (summaryElt) {
    console.info(`[${extensionName}] Removing summary element.`);
    summaryElt.remove();
  } else {
    console.warn(`[${extensionName}] No summary element found in VG page.`);
  }
};

// NOTE: Will run on page load.
// TODO: Should this even be a procedure?
(() => {
  console.info(`[${extensionName}] Removing AI summaries...`);

  // TODO: Handle this case along with the rest of the logic
  const isVg = window.location.hostname.includes("vg.no");
  if (isVg) {
    console.info(`[${extensionName}] Detected VG page.`);
    return handleVg();
  }

  const interestingElements = document.querySelectorAll(
    `.${PROBABLY_AI_CLASS_NAMES.join(", .")}`
  );

  interestingElements.forEach((element) => {
    const textContent = element.textContent || "";

    const elemnentIsSus = PROBABLY_AI_KEYWORDS.some((keyword) =>
      textContent.includes(keyword)
    );
    if (elemnentIsSus) {
      console.info(`\t[${extensionName}] Removing element:`, element);
      element.remove();
    } else {
      console.info(`\t[${extensionName}] Keeping element:`, element);
    }
  });
})();
