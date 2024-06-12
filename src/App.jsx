import { useEffect, useRef, useState } from "react";

function App() {
	// useState declarations
	const [length, setLength] = useState(10);
	const [uppercase, setUppercase] = useState(true);
	const [lowercase, setLowercase] = useState(false);
	const [numbers, setNumbers] = useState(false);
	const [special, setSpecial] = useState(false);
	const [password, setPassword] = useState("");

	// useRef declarations
	const passwordText = useRef(null);

	// Generate password function
	const generatePassword = () => {
		let pass = "";
		let str = "";
		let uppercaseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let lowercaseStr = "abcdefghijklmnopqrstuvwxyz";
		let numbersStr = "0123456789";
		let specialStr = "!@#$%&*+-/";
		if (uppercase) str += uppercaseStr;
		if (lowercase) str += lowercaseStr;
		if (numbers) str += numbersStr;
		if (special) str += specialStr;
		for (let i = 0; i < length; i++) {
			const random = Math.floor(Math.random() * str.length);
			pass += str[random];
		}
		setPassword(pass);
	};

	const copyFunction = () => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(password)
				.then(() => {
					const copy = document.getElementById("copy");
					const copied = document.getElementById("copied");
					copy.classList.toggle("hidden");
					copied.classList.toggle("hidden");
					setTimeout(() => {
						copy.classList.toggle("hidden");
						copied.classList.toggle("hidden");
					}, 800);
				})
				.catch((err) => {
					alert("Failed to copy: " + err);
				});
		} else {
			const textArea = document.createElement("textarea");
			textArea.value = password;
			textArea.style.position = "fixed";
			textArea.style.top = "0";
			textArea.style.left = "0";
			textArea.style.width = "2em";
			textArea.style.height = "2em";
			textArea.style.padding = "0";
			textArea.style.border = "none";
			textArea.style.outline = "none";
			textArea.style.boxShadow = "none";
			textArea.style.background = "transparent";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				const successful = document.execCommand("copy");
				if (successful) {
					const copy = document.getElementById("copy");
					const copied = document.getElementById("copied");
					copy.classList.toggle("hidden");
					copied.classList.toggle("hidden");
					setTimeout(() => {
						copy.classList.toggle("hidden");
						copied.classList.toggle("hidden");
					}, 800);
				} else {
					alert("Failed to copy");
				}
			} catch (err) {
				alert("Failed to copy: " + err);
			}
			document.body.removeChild(textArea);
		}
	};

	useEffect(() => {
		generatePassword();
	}, [uppercase, lowercase, numbers, special, length]);

	return (
		<>
			<div className="w-full h-dvh md:bg-[#7469B6] overflow-hidden flex items-center md:items-start">
				<div className="w-full md:w-[440px] md:max-h-[420px] mx-auto md:mt-24 bg-[#fefefe] md:dark:bg-[#fefefe] dark:bg-[#222] md:rounded-lg flex justify-start flex-col p-4 md:p-8 gap-4">
					<h1 className="font-bold text-3xl drop-shadow text-[#7469B6]">Password Generator</h1>

					{/* Generated Password section */}
					<div className="border-[3px] border-[#7469B6] flex items-center justify-between">
						<p
							className="px-2 text-[#7469b6] font-semibold overflow-hidden"
							ref={passwordText}
						>
							{password}
						</p>
						<span className="py-1 bg-[#7469b6] hover:bg-[#675c9f] active:bg-[#52497f] cursor-pointer text-white font-bold w-[80px] transition-all">
							<div
								id="copy"
								className="text-center w-full h-full transition-all"
								onClick={copyFunction}
							>
								Copy
							</div>
							<div
								id="copied"
								className="text-center hidden w-full h-full transition-all"
							>
								Copied
							</div>
						</span>
					</div>

					{/* Check boxes */}
					<div>
						<div className="flex items-center justify-between mb-4">
							<span className="font-bold text-[#7469b6] mr-2">Range:</span>
							<label
								htmlFor="length"
								className="font-bold text-[#7469b6] text-center mr-4"
							>
								{length}
							</label>
							<input
								type="range"
								name="length"
								id="length"
								min={8}
								max={24}
								defaultValue={length}
								className="w-full cursor-pointer"
								onChange={(event) => setLength(parseInt(event.target.value))}
							/>
						</div>
						<div className="flex mb-2">
							<input
								type="checkbox"
								name="uppercase"
								id="uppercase"
								className="mr-4"
								defaultChecked={true}
								onChange={() => setUppercase(!uppercase)}
							/>
							<label
								htmlFor="uppercase"
								className="font-bold text-[#7469b6] text-lg"
							>
								Include Uppercase [A - Z]
							</label>
						</div>
						<div className="flex mb-2">
							<input
								type="checkbox"
								name="lowercase"
								id="lowercase"
								className="mr-4"
								onChange={() => setLowercase(!lowercase)}
							/>
							<label
								htmlFor="lowercase"
								className="font-bold text-[#7469b6] text-lg"
							>
								Include Lowercase [a - z]
							</label>
						</div>
						<div className="flex mb-2">
							<input
								type="checkbox"
								name="numbers"
								id="numbers"
								className="mr-4"
								onChange={() => setNumbers(!numbers)}
							/>
							<label
								htmlFor="numbers"
								className="font-bold text-[#7469b6] text-lg"
							>
								Include Numbers [0 - 9]
							</label>
						</div>
						<div className="flex mb-2">
							<input
								type="checkbox"
								name="specialChar"
								id="specialChar"
								className="mr-4"
								onChange={() => setSpecial(!special)}
							/>
							<label
								htmlFor="specialChar"
								className="font-bold text-[#7469b6] text-lg"
							>
								Special Characters
							</label>
						</div>
					</div>

					{/* Generate Button */}
					<div>
						<button
							className="font-bold text-white text-2xl w-full border-2 bg-[#7469b6] hover:bg-[#675c9f] active:bg-[#52497f] py-2 rounded-lg mb-4"
							onClick={generatePassword}
						>
							Generate Password
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
