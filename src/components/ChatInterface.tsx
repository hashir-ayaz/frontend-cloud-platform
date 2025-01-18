import { useState } from "react";
import { motion } from "framer-motion";
import { fetchQuery } from "@/api/query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Clipboard, Check, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndices, setCopiedIndices] = useState<Set<number>>(new Set());

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndices((prev) => new Set(prev).add(index));
    setTimeout(() => {
      setCopiedIndices((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 2000);
  };

  const renderMessageContent = (
    content: string = "I don't know",
    index: number
  ) => {
    const parts = content.split(/(```[\w]*\n[\s\S]*?\n```)/g);

    return parts.map((part, subIndex) => {
      if (part.startsWith("```")) {
        // Handle block code
        const match = part.match(/```(\w+)?\n([\s\S]*?)\n```/);
        const language = match?.[1] || "plaintext";
        const code = match?.[2] || "";

        return (
          <div key={`${index}-${subIndex}`} className="relative my-2">
            <SyntaxHighlighter
              language={language}
              style={dracula}
              customStyle={{
                borderRadius: "8px",
                backgroundColor: "#1E1E1E",
                padding: "10px",
              }}
            >
              {code}
            </SyntaxHighlighter>
            <button
              onClick={() => handleCopy(code, index * 1000 + subIndex)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-100"
            >
              {copiedIndices.has(index * 1000 + subIndex) ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Clipboard className="w-5 h-5" />
              )}
            </button>
          </div>
        );
      } else {
        return (
          <ReactMarkdown key={`${index}-${subIndex}`} className="text-gray-200">
            {part.trim()}
          </ReactMarkdown>
        );
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const folderName = localStorage.getItem("folderName");
    if (!folderName) {
      console.error("folderName is null");
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "..." }]);

    try {
      const response = await fetchQuery(input, folderName);
      const assistantMessage: Message = {
        role: "assistant",
        content: response.message,
      };

      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages.pop();
        return [...updatedMessages, assistantMessage];
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <motion.h1
          className="mb-8 text-5xl font-extrabold text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Chat with Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-pinkishGlow">
            Codebase
          </span>
        </motion.h1>
        <motion.div
          className="relative mx-auto w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border border-gray-700 shadow-xl bg-secondary">
            <CardContent className="p-6">
              <div className="overflow-y-auto p-4 mb-4 space-y-6 h-[36rem] bg-gray-800 rounded-lg border border-gray-600 text-textLight">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg shadow-sm whitespace-pre-wrap w-full ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-accent to-pinkishGlow text-white text-right"
                        : "bg-gray-700 text-gray-200 text-left"
                    }`}
                  >
                    {message.content === "..." ? (
                      <span className="flex justify-center items-center space-x-2">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full delay-200 animate-pulse"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
                      </span>
                    ) : (
                      renderMessageContent(message.content, index)
                    )}
                    {message.role === "assistant" &&
                      message.content !== "..." && ( // Hide copy button during loading
                        <button
                          onClick={() => handleCopy(message.content, index)}
                          className="mt-2 text-sm text-gray-400 hover:text-gray-100"
                        >
                          {copiedIndices.has(index) ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Clipboard className="w-5 h-5" />
                          )}
                        </button>
                      )}
                  </motion.div>
                ))}
              </div>
              <motion.form
                onSubmit={handleSubmit}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about the codebase..."
                  className="flex-grow text-white bg-gray-800 rounded-lg border-gray-600 shadow-sm"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 text-white bg-gradient-to-r rounded-lg shadow transition from-accent to-pinkishGlow"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </motion.form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
