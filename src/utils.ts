export type FormType = {
    bic: string;
    to: string;
    account: string;
    amount: string;
    comm: string;
};

// const STRING_EXAMPLE = `BCD\n001\n1\nSCT\nKREDBEBB\nKlinik St Josef\nBE52731114007509\nEUR66.17\n\n624/4103/41919`;

const verifyComm = (comm: string, errors: string[]) => {
    const start = Number(comm.slice(0, 10));
    const end = Number(comm.slice(10));
    const reminder = start % 97;
    if (end !== reminder) errors.push("Structured communication is invalid");
};

export const checkAndcompileQRString = (
    values: FormType
): [string, string[]] => {
    const { bic, to, account, amount, comm } = values;
    let errors: string[] = [];
    if (bic.length !== 8 || !bic) {
        errors.push("BIC must be 8 characters long");
    }
    if (isNaN(Number(amount)) || !amount) {
        errors.push("Amount must be a number");
    }
    if (comm.length !== 12 || !comm) {
        errors.push("COMM must be 12 characters long");
    }
    verifyComm(comm, errors);

    return [
        `BCD\n001\n1\nSCT\n${bic}\n${
            to ?? "Name missing"
        }\n${account}\nEUR${amount}\n\n${comm.replace(
            /(\d{3})(\d{4})(\d{5})/,
            "$1/$2/$3"
        )}`,
        errors,
    ];
};
