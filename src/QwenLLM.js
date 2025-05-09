import { BaseLanguageModel } from "@langchain/core/language_models/base";
import axios from "axios";

class QwenLMM extends BaseLanguageModel {
  _llmType() {
    return "qwen";
  }


  constructor(options = {}) {
    super(options);
  }

  async _call(prompt, options) {
    try {
      const response = await axios.post("http://localhost:11434/api/generate", {
        prompt,
        temperature: 0,
      });
      return response.data.output;
    } catch (error) {
      console.error("Qwen API error:", error);
      throw new Error("qwen API call failed");
    }
  }
}

export default QwenLMM;
