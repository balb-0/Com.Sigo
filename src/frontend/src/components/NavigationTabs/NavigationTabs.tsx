import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NavigationTabs.css';

interface Tab {
    href: string;
    label: string;
    icon?: React.ReactNode;
    iconSelected?: React.ReactNode;
}

interface NavigationTabsProps {
    tabs: Tab[];
}

export default function NavigationTabs({ tabs }: NavigationTabsProps) {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <nav className="navigation-tabs">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <a
                        key={tab.href}
                        href={tab.href}
                        className="nav-link"
                    >
                        <span className={`nav-content ${isActive ? 'active' : 'inactive'}`}>
                            {isActive ? tab.iconSelected : tab.icon}
                            {tab.label}
                        </span>
                        {isActive && (
                            <motion.div
                                layoutId="active-tab-indicator"
                                className="active-indicator"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </a>
                );
            })}
        </nav>
    );
}