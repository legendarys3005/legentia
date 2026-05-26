import React from "react";
import Sidebar from "../components/Sidebar";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={styles.container}>
            <Sidebar />
            <main style={styles.content}>
                {children}
            </main>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
    },
    content: {
        flex: 1
    }
}