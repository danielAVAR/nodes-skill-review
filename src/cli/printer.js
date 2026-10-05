export function printList(items) {
  if (items.length === 0) {
    console.log("Sin registros");
    return;
  }
  items.forEach((item) => console.log(item.describe()));
}
