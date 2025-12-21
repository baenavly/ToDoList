import { useState } from "react";

type NameInputProps = {
  onSubmitName: (name: string) => void;
};

function NameInput({onSubmitName}:NameInputProps) {
    const [nameInput, setNameInput] = useState("");

    const handleSubmitName = () => {
        if (!nameInput.trim()) return;
        onSubmitName(nameInput);
    };

    return(
    <div>
        <input
            type="text"
            placeholder="이름을 입력하세요"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
        />
        <button onClick={handleSubmitName}>확인</button>
    </div>
);
}

export default NameInput;