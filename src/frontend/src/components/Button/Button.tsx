import './Button.css';

interface ButtonProps {
    label: string,
    icon?: React.ReactNode,
    onClick?: () => void, //tirar esse "?" depois
    disabled?: boolean,
    customPadding?: string,
}

export default function Button({ label, icon, onClick, disabled, customPadding }: ButtonProps) {
    return (
        <button
            className={`button ${customPadding || ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
            {label}
        </button>
    );
}