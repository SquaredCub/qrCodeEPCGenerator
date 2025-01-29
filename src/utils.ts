type InputType = { value: string; placeholder: string };

type FormType = {
    BIC: InputType;
    TO: InputType;
    ACCOUNT: InputType;
    AMOUNT: InputType;
    COMM: InputType;
};

// const STRING_EXAMPLE = `BCD\n001\n1\nSCT\nKREDBEBB\nKlinik St Josef\nBE52731114007509\nEUR66.17\n\n624/4103/41919`;

const checkAndcompileQRString = (
    BIC: string,
    TO: string,
    ACCOUNT: string,
    AMOUNT: string,
    COMM: string
): [string, string[]] => {
    let errors: string[] = [];
    if (BIC.length !== 8 || !BIC) {
        errors.push("BIC must be 8 characters long");
    }
    if (isNaN(Number(AMOUNT)) || !AMOUNT) {
        errors.push("Amount must be a number");
    }
    if (COMM.length !== 12 || !COMM) {
        errors.push("COMM must be 12 characters long");
    }

    return [
        `BCD\n001\n1\nSCT\n${BIC}\n${
            TO ?? "Name missing"
        }\n${ACCOUNT}\nEUR${AMOUNT}\n\n${COMM.replace(
            /(\d{3})(\d{4})(\d{5})/,
            "$1/$2/$3"
        )}`,
        errors,
    ];
};

export const getStringFromForm = (
    form: EventTarget
): [string, string[], boolean] => {
    const {
        BIC: { value: BICValue, placeholder: BICPlaceholder },
        TO: { value: TOValue, placeholder: TOPlaceholder },
        ACCOUNT: { value: ACCOUNTValue, placeholder: ACCOUNTPlaceholder },
        AMOUNT: { value: AMOUNTValue, placeholder: AMOUNTPlaceholder },
        COMM: { value: COMMValue, placeholder: COMMPlaceholder },
    } = form as EventTarget & FormType;

    if (!BICValue && !TOValue && !ACCOUNTValue && !AMOUNTValue && !COMMValue) {
        return [
            ...checkAndcompileQRString(
                BICPlaceholder,
                TOPlaceholder,
                ACCOUNTPlaceholder,
                AMOUNTPlaceholder,
                COMMPlaceholder
            ),
            true,
        ];
    }
    return [
        ...checkAndcompileQRString(
            BICValue,
            TOValue,
            ACCOUNTValue,
            AMOUNTValue,
            COMMValue
        ),
        false,
    ];
};
