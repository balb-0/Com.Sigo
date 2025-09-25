import NavigationTabs from "../NavigationTabs/NavigationTabs";
import Button from "../Button/Button";
import { JsonUploadModal } from "../JsonUploadModal";
import { useState } from "react";
import { createChamada } from "../../lib/api";
import "./Header.css";
import logoHorizontal from "../../assets/images/logo_horizontal.svg";

interface HeaderProps {
    currentPage?: string;
    onNavigate?: (page: string) => void;
}

export default function Header({ currentPage = '/', onNavigate }: HeaderProps) {
    const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleJsonSubmit = async (jsonData: any) => {
        try {
            setIsSubmitting(true);
            console.log('Enviando JSON para análise:', jsonData);
            
            const response = await createChamada(jsonData);
            console.log('Chamada criada com sucesso:', response);
            
            // Você pode adicionar uma notificação de sucesso aqui
            alert(`Chamada criada com sucesso! ID: ${response.chamada_id}`);
            
        } catch (error) {
            console.error('Erro ao criar chamada:', error);
            alert('Erro ao processar a chamada. Verifique o formato do JSON e tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <header className="header">
                <div className="logo-container">
                    <img
                        src={logoHorizontal}
                        alt="Logo"
                        width={110}
                        height={110}
                    />
                </div>
                <NavigationTabs
                    currentPage={currentPage}
                    onNavigate={onNavigate}
                    tabs={[
                        {
                            href: "/", label: "Dashboard",
                            icon:
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224Z">
                                    </path>
                                </svg>,
                            iconSelected:
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M232,64V176a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V64A24,24,0,0,1,48,40H208A24,24,0,0,1,232,64ZM160,216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z">
                                    </path>
                                </svg>
                        },
                        {
                            href: "/chat", label: "Chat",
                            icon:
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M132,24A100.11,100.11,0,0,0,32,124v84a16,16,0,0,0,16,16h84a100,100,0,0,0,0-200Zm0,184H48V124a84,84,0,1,1,84,84Z">
                                    </path>
                                </svg>,
                            iconSelected:
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M232,124A100.11,100.11,0,0,1,132,224H48a16,16,0,0,1-16-16V124a100,100,0,0,1,200,0Z">
                                    </path>
                                </svg>
                        },
                    ]}
                />
                <Button 
                    label="Analisar chamadas"
                    onClick={() => setIsJsonModalOpen(true)}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" stroke="currentColor" strokeWidth={5} viewBox="0 0 256 256">
                            <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z">
                            </path>
                        </svg>
                    }
                />
            </header>

            <JsonUploadModal
                isOpen={isJsonModalOpen}
                onClose={() => setIsJsonModalOpen(false)}
                onSubmit={handleJsonSubmit}
                isSubmitting={isSubmitting}
            />
        </>
    );
}