const Button = ({ text, onClick, disabled }: { text: string, onClick: (event: { preventDefault: () => void;}) => Promise<void>, disabled: boolean }) => {
    return (
        <button
            disabled={disabled}
            className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >{text}</button>
    );
}

export default Button;