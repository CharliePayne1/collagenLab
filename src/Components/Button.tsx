const Button = ({ text, onClick, disabled }: { text: string, onClick: (event: { preventDefault: () => void;}) => Promise<void>, disabled: boolean }) => {
    return (
        <button
            disabled={disabled}
            className="mt-4 bg-beige text-dark-green font-bold py-2 px-4 rounded cursor-pointer hover:opacity-80"
            onClick={onClick}
        >{text}</button>
    );
}

export default Button;