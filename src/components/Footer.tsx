"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600 py-6 mt-16">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>&copy; 2025 Protein Meal App</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:underline">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="hover:underline">
            お問い合わせ
          </Link>
          <Link href="/contact">お問い合わせ</Link>

        </div>
      </div>
    </footer>
  );
}
