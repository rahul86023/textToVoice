


import { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import axios from "axios";

const languageOptions = {
  hi: "hindi",
  af: "Afrikaans",
  sq: "Albanian",
  ar: "Arabic",
  hy: "Armenian",
  ca: "Catalan",
  zh: "Chinese",
  "zh-cn": "Chinese (Mandarin/China)",
  "zh-tw": "Chinese (Mandarin/Taiwan)",
  "zh-yue": "Chinese (Cantonese)",
  // Add the rest of the language options here...
};

const TextToVoiceConverter = () => {
  const [textToSpeak, setTextToSpeak] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [audioData, setAudioData] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  const handleTextChange = (e) => {
    setTextToSpeak(e.target.value);
  };

  const handleConvertClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/textToVoice",
        {
          textToSpeak,
          language: selectedLanguage,
        },
        {
          responseType: "blob", // Receive the response as a Blob
        }
      );

      // Create a URL for the Blob response
      const audioUrl = window.URL.createObjectURL(new Blob([response.data]));

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "output.mp3"; // Set the desired file name here
      a.style.display = "none";

      // Append the anchor to the body and trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up by removing the anchor and revoking the Blob URL
      document.body.removeChild(a);
      window.URL.revokeObjectURL(audioUrl);
    } catch (error) {
      console.error("Error converting text to voice:", error);
    }
  };

  return (
    <>
      <h1>Text to Voice Converter</h1>
      <Form>
        <FormGroup>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
              {languageOptions[selectedLanguage]}
            </DropdownToggle>
            <DropdownMenu>
              {Object.keys(languageOptions).map((code) => (
                <DropdownItem
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                >
                  {languageOptions[code]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            placeholder="Enter text to convert to voice"
            value={textToSpeak}
            onChange={handleTextChange}
            rows={5}
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" onClick={handleConvertClick}>
            Download Audio
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default TextToVoiceConverter;
