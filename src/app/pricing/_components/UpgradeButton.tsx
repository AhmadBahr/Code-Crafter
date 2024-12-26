
import { Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
    const CHEKOUT_URL =
        "https://codecraft1.lemonsqueezy.com/buy/ad5f8d72-4c35-4f11-964e-f90716b897b1"
    return (
        <Link
            href={CHEKOUT_URL}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
        >
            <Zap className="w-5 h-5" />
            Upgrade to Pro
        </Link>
    );
}
