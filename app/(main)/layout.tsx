import React from "react";
import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.mainWrapper}>
                <Appbar />
                <main style={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0f0f0f",
    },
    mainWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column" as const,
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0f0f0f",
    },
    content: {
        flex: 1,
        overflowY: "auto" as const,
    }
}