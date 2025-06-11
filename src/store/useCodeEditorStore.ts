import { CodeEditorState } from "./../types/index";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Monaco } from "@monaco-editor/react";
import toast from "react-hot-toast";

const STORAGE_KEY = "code-editor-state";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
      recentLanguages: [] as string[],
      recentSnippets: [] as { id: string; title: string }[],
    };
  }

  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return {
        language: parsed.language || "javascript",
        theme: parsed.theme || "vs-dark",
        fontSize: Number(parsed.fontSize) || 16,
        recentLanguages: parsed.recentLanguages || [],
        recentSnippets: parsed.recentSnippets || [],
      };
    }
  } catch (error) {
    console.error("Error loading saved state:", error);
  }

  return {
    language: "javascript",
    fontSize: 16,
    theme: "vs-dark",
    recentLanguages: [],
    recentSnippets: [],
  };
};

export const useCodeEditorStore = create<CodeEditorState>()(
  persist(
    (set, get) => {
      const initialState = getInitialState();

      return {
        ...initialState,
        output: "",
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,
        executionTime: null,

        getCode: () => get().editor?.getValue() || "",

        setEditor: (editor: Monaco) => {
          const savedCode = localStorage.getItem(`editor-code-${get().language}`);
          if (savedCode) editor.setValue(savedCode);

          set({ editor });
        },

        setTheme: (theme: string) => {
          localStorage.setItem("editor-theme", theme);
          set({ theme });
        },

        setFontSize: (fontSize: number) => {
          const size = Math.min(Math.max(fontSize, 12), 24);
          localStorage.setItem("editor-font-size", size.toString());
          set({ fontSize: size });
        },

        setLanguage: (language: string) => {
          const currentState = get();
          const currentCode = currentState.editor?.getValue();
          
          // Save current language code
          if (currentCode) {
            localStorage.setItem(`editor-code-${currentState.language}`, currentCode);
          }

          // Update recent languages
          const recentLanguages = [
            language,
            ...currentState.recentLanguages.filter(l => l !== language)
          ].slice(0, 5);

          localStorage.setItem("editor-language", language);
          set({
            language,
            output: "",
            error: null,
            recentLanguages,
          });
        },

        addRecentSnippet: (id: string, title: string) => {
          const currentState = get();
          const recentSnippets = [
            { id, title },
            ...currentState.recentSnippets.filter(s => s.id !== id)
          ].slice(0, 5);

          set({ recentSnippets });
        },

        runCode: async () => {
          const { language, getCode } = get();
          const code = getCode();

          if (!code) {
            toast.error("Please enter some code");
            set({ error: "Please enter some code" });
            return;
          }

          const startTime = performance.now();
          set({ isRunning: true, error: null, output: "", executionTime: null });

          try {
            const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                language: runtime.language,
                version: runtime.version,
                files: [{ content: code }],
              }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Handle API-level errors
            if (data.message) {
              toast.error(data.message);
              set({ 
                error: data.message, 
                executionResult: { code, output: "", error: data.message } 
              });
              return;
            }

            // Handle compilation errors
            if (data.compile && data.compile.code !== 0) {
              const error = data.compile.stderr || data.compile.output;
              toast.error("Compilation failed");
              set({
                error,
                executionResult: {
                  code,
                  output: "",
                  error,
                },
              });
              return;
            }

            // Handle runtime errors
            if (data.run && data.run.code !== 0) {
              const error = data.run.stderr || data.run.output;
              toast.error("Runtime error");
              set({
                error,
                executionResult: {
                  code,
                  output: "",
                  error,
                },
              });
              return;
            }

            // Success case
            const output = data.run.output;
            const endTime = performance.now();
            const executionTime = Math.round(endTime - startTime);

            toast.success("Code executed successfully");
            set({
              output: output.trim(),
              error: null,
              executionTime,
              executionResult: {
                code,
                output: output.trim(),
                error: null,
              },
            });
          } catch (error) {
            console.error("Error running code:", error);
            toast.error("Failed to execute code");
            set({
              error: error instanceof Error ? error.message : "Error running code",
              executionResult: { 
                code, 
                output: "", 
                error: error instanceof Error ? error.message : "Error running code" 
              },
            });
          } finally {
            set({ isRunning: false });
          }
        },
      };
    },
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        fontSize: state.fontSize,
        recentLanguages: state.recentLanguages,
        recentSnippets: state.recentSnippets,
      }),
    }
  )
);

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;
