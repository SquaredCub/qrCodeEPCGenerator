import { toDataURL } from "qrcode";
import { FormEvent, useRef } from "react";
import logo from "./assets/logo.jpg";
import Form from "./components/Form";
import "./style/App.scss";
import { getStringFromForm } from "./utils";

const DEFAULT_SIZE = 250;

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const warningRef = useRef<HTMLSpanElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target;
        // If whole form is empty, we used the placeholders
        const [compiledString, errors, usedPlaceholders] =
            getStringFromForm(target);

        if (errors.length) {
            alert(errors.join("\n"));
            return;
        } else {
            const canvas = canvasRef.current;
            if (canvas) {
                await toDataURL(canvas, compiledString, {
                    width: DEFAULT_SIZE,
                });
            }

            if (usedPlaceholders) {
                warningRef.current?.classList.add("visible");
            } else {
                warningRef.current?.classList.remove("visible");
            }
            logoRef.current?.classList.add("visible");
        }
    };

    return (
        <>
            <h1>QR code</h1>
            <div className="card">
                <Form onSubmit={handleGenerate} />
            </div>
            <div className="canvasContainer">
                <canvas
                    id="canvas"
                    ref={canvasRef}
                    width={DEFAULT_SIZE}
                    height={DEFAULT_SIZE}
                />
                <div className="logo" ref={logoRef}>
                    <img src={logo} alt="squaredcub" />
                </div>
                <span className="warning" ref={warningRef}>
                    Used placeholders
                </span>
            </div>
        </>
    );
}

export default App;
