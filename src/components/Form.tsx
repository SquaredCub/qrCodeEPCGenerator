import { FormEvent } from "react";

const Form = ({
    onSubmit,
}: {
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
    return (
        <form onSubmit={onSubmit} className="form">
            <label htmlFor="BIC">
                <span className="label">BIC :</span>
                <input
                    type="text"
                    id="BIC"
                    name="BIC"
                    placeholder={"BPOTBEB1"}
                />
            </label>
            <label htmlFor="TO">
                <span className="label">TO :</span>
                <input
                    type="text"
                    id="TO"
                    name="TO"
                    placeholder="Red Cross of Belgium"
                />
            </label>
            <label htmlFor="ACCOUNT">
                <span className="label">ACCOUNT :</span>
                <input
                    type="text"
                    id="ACCOUNT"
                    name="ACCOUNT"
                    placeholder="BE72000000001616"
                />
            </label>
            <label htmlFor="AMOUNT">
                <span className="label">AMOUNT :</span>
                <input
                    type="text"
                    id="AMOUNT"
                    name="AMOUNT"
                    placeholder="1.01"
                />
            </label>
            <label htmlFor="COMM">
                <span className="label">COMM. :</span>
                <input
                    type="text"
                    id="COMM"
                    name="COMM"
                    placeholder="333444455506"
                />
            </label>
            <button type="submit">Generate</button>
        </form>
    );
};

export default Form;
