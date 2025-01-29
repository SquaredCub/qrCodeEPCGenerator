import { toDataURL } from "qrcode";
import { useRef } from "react";
import logo from "./assets/logo.jpg";
import Form from "./components/Form";
import "./style/App.scss";
import { FormType, checkAndcompileQRString } from "./utils";

const DEFAULT_SIZE = 250;

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async (values: FormType) => {
        // If whole form is empty, we used the placeholders
        const [compiledString, errors] = checkAndcompileQRString(values);

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
            </div>
        </>
    );
}

export default App;
