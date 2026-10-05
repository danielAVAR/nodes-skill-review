import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({ input: stdin, output: stdout });

export async function ask(question) {
  const answer = await rl.question(question);
  return answer.trim();
}

export async function askNumber(question) {
  const text = await ask(question);
  const value = Number(text);
  if (text === "" || Number.isNaN(value)) {
    throw new Error("Debe ingresar un número");
  }
  return value;
}

export function closePrompt() {
  rl.close();
}
