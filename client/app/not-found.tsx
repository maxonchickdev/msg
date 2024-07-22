"use client";

import { CustomError } from "./components/custom/error/error";

export default function NotFoundPage() {
    return <CustomError content="Page not found" />;
}
