import Header from "../../components/Header/Header";
import './Dashboard.css';

interface DashboardProps {
    currentPage?: string;
    onNavigate?: (page: string) => void;
}

export default function Dashboard({ currentPage, onNavigate }: DashboardProps) {
    return (
        <div className="dashboard-container">
            <Header currentPage={currentPage} onNavigate={onNavigate} />
            <main className="main-content">
                <div className="title-section">
                    <h1 className="page-title">Dashboard de Qualidade</h1>
                </div>
            </main>
        </div>
    );
}