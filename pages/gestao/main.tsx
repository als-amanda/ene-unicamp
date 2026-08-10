import React from "react";
import { createRoot } from "react-dom/client";
import Gestao from "../../app/gestao/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(<React.StrictMode><Gestao /></React.StrictMode>);
