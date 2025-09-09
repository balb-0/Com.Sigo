import Header from "../../components/Header/Header";
import './Dashboard.css';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Header />
            <main className="main-content">
                <div className="title-section">
                    <h1 className="page-title">Dashboard de Qualidade</h1>
                </div>
            </main>
        </div>
    );
}