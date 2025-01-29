import { FormEvent, MutableRefObject } from "react";
import { useIMask } from "react-imask";
import { FormType } from "../utils";

type Reff = MutableRefObject<HTMLInputElement | null>;

const Form = ({
    onSubmit,
}: {
    onSubmit: (values: FormType) => Promise<void>;
}) => {
    const { ref: bicRef, unmaskedValue: bicValue } = useIMask({
        name: "BIC",
        mask: "**** ** **",
    });
    const { ref: accountRef, unmaskedValue: accountValue } = useIMask({
        name: "ACCOUNT",
        mask: "aa00 rrrr rrrr rrrr rrrr rrrr rrrr rrrr rr",
        definitions: {
            r: /[A-Za-z0-9]/,
        },
        prepareChar: (str) => str.toUpperCase(),
    });
    const { ref: amountRef, unmaskedValue: amountValue } = useIMask({
        name: "AMOUNT",
        mask: "€ num",
        blocks: { num: { mask: Number } },
        radix: ",",
        mapToRadix: [",", "."],
        lazy: false,
    });
    const { ref: comRef, unmaskedValue: comValue } = useIMask({
        name: "COMM",
        mask: "+++000/0000/00000+++",
        lazy: false,
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const values = {
            bic: bicValue,
            to: e.currentTarget.TO.value,
            account: accountValue,
            amount: amountValue,
            comm: comValue,
        };
        onSubmit && onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="BIC">
                <span className="label">BIC :</span>
                <input ref={bicRef as Reff} defaultValue="BPOTBEB1" />
            </label>
            <label htmlFor="TO">
                <span className="label">TO :</span>
                <input
                    type="text"
                    id="TO"
                    name="TO"
                    defaultValue="Red Cross of Belgium"
                />
            </label>
            <label htmlFor="ACCOUNT">
                <span className="label">ACCOUNT :</span>
                <input
                    ref={accountRef as Reff}
                    defaultValue="BE72000000001616"
                />
            </label>
            <label htmlFor="AMOUNT">
                <span className="label">AMOUNT :</span>
                <input ref={amountRef as Reff} defaultValue="1,01" />
            </label>
            <label htmlFor="COMM">
                <span className="label">COMM. :</span>
                <input ref={comRef as Reff} defaultValue="333444455506" />
            </label>
            <button type="submit">Generate</button>
        </form>
    );
};

export default Form;
