import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 border-b">
      <Link href="/">ホーム</Link>
      <Link href="/privacy-policy">プライバシーポリシー</Link>
      <Link href="/contact">お問い合わせ</Link>

    </nav>
  );
};

export default Navbar;
