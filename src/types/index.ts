import { Monaco } from "@monaco-editor/react";
import { Id } from "../../convex/_generated/dataModel";

export interface Theme {
    id: string;
    label: string;
    color: string;
}

export interface Language {
    id: string;
    label: string;
    logoPath: string;
    monacoLanguage: string;
    defaultCode: string;
    pistonRuntime: LanguageRuntime;
}

export interface LanguageRuntime {
    language: string;
    version: string;
}

export interface ExecuteCodeResponse {
    compile?: {
        output: string;
        code: number;
        stderr?: string;
    };
    run?: {
        output: string;
        stderr: string;
        code: number;
    };
    message?: string;
}

export interface ExecutionResult {
    code: string;
    output: string;
    error: string | null;
    executionTime?: number;
}

export interface RecentSnippet {
    id: string;
    title: string;
}

export interface CodeEditorState {
    language: string;
    theme: string;
    fontSize: number;
    editor: Monaco | null;
    output: string;
    isRunning: boolean;
    error: string | null;
    executionResult: ExecutionResult | null;
    executionTime: number | null;
    recentLanguages: string[];
    recentSnippets: RecentSnippet[];
    setEditor: (editor: Monaco) => void;
    getCode: () => string;
    setLanguage: (language: string) => void;
    setTheme: (theme: string) => void;
    setFontSize: (fontSize: number) => void;
    addRecentSnippet: (id: string, title: string) => void;
    runCode: () => Promise<void>;
}

export interface Snippet {
    _id: Id<"snippets">;
    _creationTime: number;
    userId: string;
    language: string;
    code: string;
    title: string;
    userName: string;
    description?: string;
    isPublic: boolean;
    starCount: number;
    viewCount: number;
    tags?: string[];
}

export interface SnippetComment {
    _id: Id<"snippetComments">;
    _creationTime: number;
    snippetId: Id<"snippets">;
    userId: string;
    userName: string;
    content: string;
    updatedAt?: number;
}

export interface User {
    _id: Id<"users">;
    userId: string;
    email: string;
    name: string;
    isPro: boolean;
    proSince?: number;
    lastActive?: number;
    avatarUrl?: string;
    lemonSqueezyCustomerId?: string;
    lemonSqueezyOrderId?: string;
}
