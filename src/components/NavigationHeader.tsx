import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
            <div className="container mx-auto px-4">
                <nav className="relative h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Logo */}
                        <Link 
                            href="/" 
                            className="flex items-center gap-3 group relative"
                            aria-label="CodeCraft Home"
                        >
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg opacity-0 
                                group-hover:opacity-100 transition-all duration-500 blur-xl" />

                            <div className="relative bg-gradient-to-br from-secondary to-background p-2 rounded-xl ring-1 ring-border group-hover:ring-primary/20 transition-all">
                                <Blocks className="w-6 h-6 text-primary transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                            </div>

                            <div className="relative">
                                <span className="block text-lg font-semibold bg-gradient-to-r from-primary via-primary/80 to-accent text-transparent bg-clip-text">
                                    CodeCraft
                                </span>
                                <span className="block text-xs text-primary/60 font-medium">
                                    Interactive Code Editor
                                </span>
                            </div>
                        </Link>

                        {/* Snippets Link */}
                        <Link
                            href="/snippets"
                            className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-foreground/80 bg-secondary/50 hover:bg-primary/10 
                                border border-border hover:border-primary/50 transition-all duration-300 shadow-lg overflow-hidden"
                            aria-label="View Code Snippets"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                            <span className="text-sm font-medium relative z-10 group-hover:text-foreground transition-colors">
                                Snippets
                            </span>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <Link
                                href="/pricing"
                                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20
                                    hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                                    to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                                    duration-300"
                                aria-label="View Pro Pricing"
                            >
                                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                                    Pro
                                </span>
                            </Link>
                        </SignedOut>

                        <HeaderProfileBtn />
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default NavigationHeader;
