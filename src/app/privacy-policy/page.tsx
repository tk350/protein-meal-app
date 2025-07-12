"use client";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto p-8 text-sm leading-relaxed">
      <h1 className="text-xl font-bold mb-4">プライバシーポリシー</h1>

      <p>
        当サイト（https://protein-meal-xxx.vercel.app/）では、以下の方針に従い、個人情報の保護および適切な取り扱いを行います。
      </p>

      <h2 className="font-bold mt-6">1. 広告配信について</h2>
      <p>
        当サイトは第三者配信の広告サービス「Google AdSense（グーグルアドセンス）」を利用する予定です。
        このような広告配信事業者は、ユーザーの興味に応じた広告を表示するため、Cookie（クッキー）を使用することがあります。
      </p>
      <p>
        Cookieを使用することで、当サイトはユーザーのコンピューターを識別できるようになりますが、個人を特定する情報（名前・住所・メールアドレスなど）は含まれません。
        Google広告におけるCookieの取り扱いについての詳細は、
        <a
          href="https://policies.google.com/technologies/ads?hl=ja"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          こちら
        </a>
        をご確認ください。
      </p>

      <h2 className="font-bold mt-6">2. アクセス解析ツールについて</h2>
      <p>
        当サイトでは、Googleが提供するアクセス解析ツール「Google アナリティクス」を使用しています。
        このGoogle アナリティクスはトラフィックデータの収集のためにCookieを使用しています。
        このデータは匿名で収集されており、個人を特定するものではありません。
      </p>

      <h2 className="font-bold mt-6">3. 個人情報の利用目的</h2>
      <p>
        当サイトでは、お問い合わせやコメントの際に、名前やメールアドレスなどの個人情報を入力いただく場合があります。
        これらの情報は質問に対する回答や必要な情報を電子メールなどでご連絡する場合に利用し、それ以外の目的では利用しません。
      </p>

      <h2 className="font-bold mt-6">4. 免責事項</h2>
      <p>
        当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
        また、当サイトの掲載内容については、できる限り正確な情報を提供するよう努めていますが、正確性・安全性を保証するものではありません。
      </p>

      <h2 className="font-bold mt-6">5. プライバシーポリシーの変更について</h2>
      <p>
        当サイトは、法令の変更やサービスの改善などにより、プライバシーポリシーを変更する場合があります。変更後のポリシーはこのページにて公表いたします。
      </p>

      <p className="mt-8">
        制定日：2025年7月<br />
        運営者：走る人
      </p>
    </main>
  );
}
