let color: string = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// const btn = document.getElementById("button")

// btn?.addEventListener("click", onSubmit)

// function onSubmit(): void {
//   console.log("hello")
// }