export function currencyMask(text: string) {
    let value = text.toString();
  
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
  }
  export function onlyNumbersMask(text: string) {
    let numbers = text.replace(/\D/g, "");
    return numbers;
  }
  export function currencyMaskToNumber(text: string) {
    let value = text.toString();
    value = value.replace(".", " ");
    value = value.replace(",", ".");
    value = value.replace(" ", "");
  
    return Number(value);
  }
  export function weightMask(text: string) {
    let value = text.toString();
    if (value.startsWith(",")) {
      value = value.slice(1);
    }
    value = value.replace(/[^\w\s\][^,]/gi, "");
    value = value.replace(" ", "");
    value = value.replace("-", "");
    value = value.replace(",,",",")
    value = value.replace(/^[a-zA-Z]+$/,"")
    
    return value;
  }
  export function weightMaskToNumber(text: string) {
    let value = text.toString();
    value = value.replace(",", ".");
    return value;
  }
  export function captalizeText(text: string) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text;
  }