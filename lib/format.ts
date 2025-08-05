export const FormatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
    }).format(price);
    }

export const extractFileName=(filePath: string): string=> {
        const fileName = filePath.split(/\\|\//).pop();
        return fileName || '';
}

export const dateFormater = (isoDate:Date) : string=>{
  const date = new Date(isoDate);
  
  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
  return `${day}/${month}/${year}`;
}