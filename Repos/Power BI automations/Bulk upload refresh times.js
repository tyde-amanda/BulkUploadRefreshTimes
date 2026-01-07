(() => {
  // ====== CONFIG (edit this list however you want) ======
  // Use hour as "1".."12", minute as "00" or "30", ampm as "AM"/"PM"
  const times = [
    ["7","00","AM"], ["7","30","AM"],
    ["8","00","AM"], ["8","30","AM"],
    ["9","00","AM"], ["9","30","AM"],
    ["10","00","AM"], ["10","30","AM"],
    ["11","00","AM"], ["11","30","AM"],
    ["12","00","PM"], ["12","30","PM"],
    ["1","00","PM"], ["1","30","PM"],
    ["2","00","PM"], ["2","30","PM"],
    ["3","00","PM"],["3","30","PM"], ["4","00","PM"],
    ["4","30","PM"], ["5","00","PM"],
    ["5","30","PM"], ["6","00","PM"],
    ["6","30","PM"], ["7","00","PM"]
  ];
  // =====================================================

  const addLink = document.querySelector("a.addRefreshTime");
  if (!addLink) {
    console.error("Couldn't find the 'Add another time' link (a.addRefreshTime).");
    return;
  }

  // A row = any visible element that contains exactly 3 selects (hour/min/ampm) and a delete button
  function getRows() {
    return [...document.querySelectorAll("button.refreshTimeDeleteButton")]
      .map(btn => btn.closest("div"))
      .filter(div => div && div.querySelectorAll("select").length === 3 && div.offsetParent !== null);
  }

  function setSelectByText(select, text) {
    const opt = [...select.options].find(o => o.text.trim() === text);
    if (!opt) throw new Error(`Option "${text}" not found in select.`);
    select.value = opt.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

  (async () => {
    // Ensure we have enough rows
    while (getRows().length < times.length) {
      addLink.click();
      await sleep(80); // give Angular time to render the new row
    }

    const rows = getRows().slice(0, times.length);

    rows.forEach((row, i) => {
      const [h, m, ap] = times[i];
      const selects = row.querySelectorAll("select");
      // Assumption based on your markup order: hour, minute, AM/PM
      setSelectByText(selects[0], h);
      setSelectByText(selects[1], m);
      setSelectByText(selects[2], ap);
    });

    console.log(`Filled ${times.length} time(s). Now click Apply (or run: clickApply())`);
    window.clickApply = () => {
      const applyBtn = document.querySelector("button.biButton.primary.primaryBtn");
      if (applyBtn) applyBtn.click();
      else console.error("Apply button not found.");
    };
  })();
})();
