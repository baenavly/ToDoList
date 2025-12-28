import { useState } from "react";

type NameInputProps = {
  onSubmitName: (name: string) => void;
};

function NameInput({ onSubmitName }: NameInputProps) {
  const [nameInput, setNameInput] = useState("");

  const handleSubmitName = () => {
    if (!nameInput.trim()) return;
    onSubmitName(nameInput);
  };

  return (
    <div className="input-area" id="nameInputArea">
      <input
        className="text-input"
        id="nameInput"
        type="text"
        placeholder="이름을 입력하세요"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <button id="saveNameBtn" onClick={handleSubmitName}>
        확인
      </button>
    </div>
  );
}

export default NameInput;
