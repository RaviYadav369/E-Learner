export const FormatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
    }

export const extractFileName=(filePath: string): string=> {
        const fileName = filePath.split(/\\|\//).pop();
        return fileName || '';
}