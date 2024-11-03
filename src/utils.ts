export function printProgressBar(completed : number, total : number, barLength = 40) {
  const progress = Math.min(completed / total, 1); // Ensure progress does not exceed 100%
  const filledLength = Math.round(progress * barLength);
  const bar = '█'.repeat(filledLength) + '-'.repeat(barLength - filledLength);
  const percentage = (progress * 100).toFixed(2);

  // Only use TTY features if stdout supports it (i.e., we're in a terminal environment)
  if (process.stdout.isTTY) {
    process.stdout.clearLine(0); // Clear the current line
    process.stdout.cursorTo(0); // Move the cursor to the start of the line
    process.stdout.write(`Progress: [${bar}] ${percentage}%`);
    if (completed >= total) {
      process.stdout.write('\n'); // Move to the next line when complete
    }
  } else {
    // Fallback behavior for non-TTY environments (like Jest)
    console.log(`Progress: [${bar}] ${percentage}%`);
  }
}
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function reverseString(str: string): string {
  const retArray = [];
  for (let i = str.length - 1; i >= 0; i--) {
    retArray.push(str[i]);
  }
  return retArray.join('');
}
export function getObjectSize(obj: { [key: string]: any }): number {
  return Object.keys(obj).length;
}

